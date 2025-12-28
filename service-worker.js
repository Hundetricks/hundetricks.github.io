// ============================================================
// HUNDETRICKS SERVICE WORKER v3.0 - PRODUCTION
// Lokale UND Online Nutzung - 100% kompatibel
// ============================================================

const VERSION = '3.0.0';
const CACHE_NAME = `hundetricks-v${VERSION}`;
const DATA_CACHE = `hundetricks-data-v${VERSION}`;

// IndexedDB Configuration
const DB_NAME = 'HundetricksDB';
const DB_VERSION = 3;

// ============================================================
// ASSETS TO CACHE (nur essentielles)
// ============================================================
const CORE_ASSETS = [
    './',
    './index.html',
    './manifest.json'
];

// Optional assets (graceful degradation)
const OPTIONAL_ASSETS = [
    './Hundetricks.json'
];

// ============================================================
// INDEXEDDB HELPER
// ============================================================

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            
            // Tricks Store
            if (!db.objectStoreNames.contains('tricks')) {
                const store = db.createObjectStore('tricks', { keyPath: 'id' });
                store.createIndex('timestamp', 'timestamp');
                store.createIndex('source', 'source');
            }
            
            // Learned Store
            if (!db.objectStoreNames.contains('learned')) {
                db.createObjectStore('learned', { keyPath: 'id' });
            }
            
            // Custom Tricks Store
            if (!db.objectStoreNames.contains('custom')) {
                db.createObjectStore('custom', { keyPath: 'id', autoIncrement: true });
            }
            
            // Settings Store
            if (!db.objectStoreNames.contains('settings')) {
                db.createObjectStore('settings', { keyPath: 'key' });
            }
            
            // Backups Store
            if (!db.objectStoreNames.contains('backups')) {
                const backupStore = db.createObjectStore('backups', { keyPath: 'id', autoIncrement: true });
                backupStore.createIndex('timestamp', 'timestamp');
            }
        };
    });
}

async function saveToIDB(storeName, data) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction([storeName], 'readwrite');
        const request = tx.objectStore(storeName).put(data);
        
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
        
        tx.oncomplete = () => db.close();
        tx.onerror = () => { db.close(); reject(tx.error); };
    });
}

async function getFromIDB(storeName, key) {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction([storeName], 'readonly');
            const request = tx.objectStore(storeName).get(key);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
            
            tx.oncomplete = () => db.close();
            tx.onerror = () => { db.close(); reject(tx.error); };
        });
    } catch (err) {
        return null;
    }
}

async function getAllFromIDB(storeName) {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction([storeName], 'readonly');
            const request = tx.objectStore(storeName).getAll();
            
            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
            
            tx.oncomplete = () => db.close();
            tx.onerror = () => { db.close(); reject(tx.error); };
        });
    } catch (err) {
        return [];
    }
}

// ============================================================
// JSON VALIDATION & NORMALIZATION
// ============================================================

function validateTricksData(data) {
    if (!data || typeof data !== 'object') return false;
    
    // New structure
    if (data.trick_database) {
        const db = data.trick_database;
        return !!(db.beginner?.list && db.intermediate?.list && db.advanced?.list);
    }
    
    // Old structure
    return !!(Array.isArray(data.anfänger) && 
              Array.isArray(data.fortgeschritten) && 
              Array.isArray(data.experten));
}

function normalizeJSON(data) {
    // New structure → Old structure
    if (data.trick_database) {
        return {
            anfänger: data.trick_database.beginner?.list || [],
            fortgeschritten: data.trick_database.intermediate?.list || [],
            experten: data.trick_database.advanced?.list || []
        };
    }
    
    // Already old structure
    if (data.anfänger) {
        return data;
    }
    
    console.warn('[SW] Unknown JSON structure');
    return data;
}

// ============================================================
// SMART JSON LOADING - Local First!
// ============================================================

async function loadTricksData() {
    console.log('[SW] 🔍 Loading Tricks Data...');
    
    // TIER 1: IndexedDB (fastest)
    try {
        const cached = await getFromIDB('tricks', 'current');
        if (cached?.data && validateTricksData(cached.data)) {
            const age = Date.now() - cached.timestamp;
            const ageHours = Math.floor(age / 3600000);
            
            console.log(`[SW] ✓ IndexedDB (${ageHours}h old)`);
            
            // Background update if >1h old AND online
            if (age > 3600000 && self.navigator.onLine) {
                updateInBackground();
            }
            
            return normalizeJSON(cached.data);
        }
    } catch (err) {
        console.log('[SW] IndexedDB miss');
    }
    
    // TIER 2: Local File (PRIORITY!)
    const localUrls = [
        './Hundetricks.json',
        '/Hundetricks.json',
        '../Hundetricks.json'
    ];
    
    for (const url of localUrls) {
        try {
            console.log(`[SW] Trying local: ${url}`);
            const response = await fetch(url, { cache: 'no-cache' });
            
            if (response.ok) {
                const data = await response.json();
                
                if (validateTricksData(data)) {
                    console.log(`[SW] ✓ Local file: ${url}`);
                    
                    // Cache in IndexedDB
                    await saveToIDB('tricks', {
                        id: 'current',
                        data: data,
                        timestamp: Date.now(),
                        source: 'local'
                    });
                    
                    return normalizeJSON(data);
                }
            }
        } catch (err) {
            // Silent fail, try next
        }
    }
    
    // TIER 3: GitHub (Online Fallback)
    if (self.navigator.onLine) {
        const githubUrls = [
            'https://hundetricks.github.io/Hundetricks.json',
            'https://raw.githubusercontent.com/Hundetricks/hundetricks.github.io/main/Hundetricks.json',
            'https://raw.githack.com/Hundetricks/hundetricks.github.io/main/Hundetricks.json'
        ];
        
        for (const url of githubUrls) {
            try {
                console.log(`[SW] Trying GitHub: ${url}`);
                const response = await fetch(url, { cache: 'no-cache' });
                
                if (response.ok) {
                    const data = await response.json();
                    
                    if (validateTricksData(data)) {
                        console.log(`[SW] ✓ GitHub: ${url}`);
                        
                        // Cache in IndexedDB
                        await saveToIDB('tricks', {
                            id: 'current',
                            data: data,
                            timestamp: Date.now(),
                            source: 'github'
                        });
                        
                        return normalizeJSON(data);
                    }
                }
            } catch (err) {
                // Silent fail, try next
            }
        }
    }
    
    // TIER 4: Stale IndexedDB (even if old)
    try {
        const stale = await getFromIDB('tricks', 'current');
        if (stale?.data) {
            console.warn('[SW] ⚠ Using stale cached data');
            return normalizeJSON(stale.data);
        }
    } catch (err) {
        // Nothing
    }
    
    throw new Error('No data source available');
}

async function updateInBackground() {
    console.log('[SW] 🔄 Background update...');
    
    try {
        // Try local first
        const localResponse = await fetch('./Hundetricks.json', { cache: 'no-cache' });
        if (localResponse.ok) {
            const data = await localResponse.json();
            if (validateTricksData(data)) {
                await saveToIDB('tricks', {
                    id: 'current',
                    data: data,
                    timestamp: Date.now(),
                    source: 'local-update'
                });
                console.log('[SW] ✓ Background update from local');
                return;
            }
        }
    } catch (err) {
        // Try online
    }
    
    // Fallback to GitHub
    if (self.navigator.onLine) {
        try {
            const response = await fetch('https://hundetricks.github.io/Hundetricks.json', { 
                cache: 'no-cache' 
            });
            
            if (response.ok) {
                const data = await response.json();
                if (validateTricksData(data)) {
                    await saveToIDB('tricks', {
                        id: 'current',
                        data: data,
                        timestamp: Date.now(),
                        source: 'github-update'
                    });
                    console.log('[SW] ✓ Background update from GitHub');
                }
            }
        } catch (err) {
            console.log('[SW] Background update failed');
        }
    }
}

// ============================================================
// INSTALLATION
// ============================================================

self.addEventListener('install', (e) => {
    console.log('[SW] Installing v' + VERSION);
    
    e.waitUntil((async () => {
        // Initialize IndexedDB
        await openDB();
        
        // Cache core assets
        const cache = await caches.open(CACHE_NAME);
        
        // Add core assets (must succeed)
        await cache.addAll(CORE_ASSETS);
        console.log('[SW] ✓ Core assets cached');
        
        // Add optional assets (can fail)
        for (const asset of OPTIONAL_ASSETS) {
            try {
                await cache.add(asset);
            } catch (err) {
                console.log(`[SW] Optional asset not available: ${asset}`);
            }
        }
        
        // Pre-load JSON
        try {
            await loadTricksData();
            console.log('[SW] ✓ JSON pre-loaded');
        } catch (err) {
            console.log('[SW] JSON pre-load failed (OK for first install)');
        }
        
        await self.skipWaiting();
    })());
});

// ============================================================
// ACTIVATION
// ============================================================

self.addEventListener('activate', (e) => {
    console.log('[SW] Activating v' + VERSION);
    
    e.waitUntil((async () => {
        // Clean old caches
        const keys = await caches.keys();
        await Promise.all(
            keys.filter(key => 
                key.startsWith('hundetricks-') && 
                key !== CACHE_NAME && 
                key !== DATA_CACHE
            ).map(key => {
                console.log('[SW] Deleting old cache:', key);
                return caches.delete(key);
            })
        );
        
        await self.clients.claim();
        console.log('[SW] ✓ Activated');
        
        // Notify clients
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({
                type: 'SW_ACTIVATED',
                version: VERSION
            });
        });
    })());
});

// ============================================================
// FETCH HANDLING
// ============================================================

self.addEventListener('fetch', (e) => {
    const { request } = e;
    const url = new URL(request.url);
    
    // Ignore non-HTTP
    if (!url.protocol.startsWith('http')) return;
    
    // JSON Files - Special handling
    if (url.pathname.endsWith('.json')) {
        e.respondWith(handleJSONRequest(request));
        return;
    }
    
    // Navigation - Network first with cache fallback
    if (request.mode === 'navigate') {
        e.respondWith(handleNavigation(request));
        return;
    }
    
    // Everything else - Cache first
    e.respondWith(cacheFirst(request));
});

async function handleJSONRequest(request) {
    try {
        // Try network first
        const response = await fetch(request, { cache: 'no-cache' });
        
        if (response.ok) {
            const clone = response.clone();
            const data = await clone.json();
            
            // Validate and cache
            if (validateTricksData(data)) {
                await saveToIDB('tricks', {
                    id: 'current',
                    data: data,
                    timestamp: Date.now(),
                    source: 'fetch'
                });
            }
            
            return response;
        }
    } catch (err) {
        // Network failed
    }
    
    // Fallback to IndexedDB
    try {
        const cached = await getFromIDB('tricks', 'current');
        if (cached?.data) {
            return new Response(JSON.stringify(cached.data), {
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (err) {
        // Nothing
    }
    
    return new Response('{}', {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}

async function handleNavigation(request) {
    try {
        const response = await fetch(request, { cache: 'no-cache' });
        
        if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
            return response;
        }
    } catch (err) {
        // Network failed
    }
    
    // Fallback to cache
    const cached = await caches.match(request);
    if (cached) return cached;
    
    // Ultimate fallback
    const indexCached = await caches.match('./index.html');
    if (indexCached) return indexCached;
    
    // Offline page
    return new Response(`
        <!DOCTYPE html>
        <html lang="de">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Hundetricks - Offline</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                    background: #1a1a1a;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    text-align: center;
                    padding: 20px;
                }
                .container { max-width: 500px; }
                h1 { font-size: 4rem; margin-bottom: 1rem; }
                h2 { color: #3ea876; margin-bottom: 1rem; }
                p { color: #888; margin-bottom: 2rem; line-height: 1.6; }
                button {
                    background: #3ea876;
                    color: white;
                    border: none;
                    padding: 12px 32px;
                    border-radius: 8px;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: background 0.3s;
                }
                button:hover { background: #2d8a5f; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>📡</h1>
                <h2>Offline-Modus</h2>
                <p>Die App funktioniert offline, sobald die Daten einmal geladen wurden.</p>
                <button onclick="location.reload()">Erneut versuchen</button>
            </div>
        </body>
        </html>
    `, {
        headers: { 'Content-Type': 'text/html' }
    });
}

async function cacheFirst(request) {
    const cached = await caches.match(request);
    if (cached) {
        // Update in background
        fetch(request).then(response => {
            if (response.ok) {
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(request, response);
                });
            }
        }).catch(() => {});
        
        return cached;
    }
    
    try {
        const response = await fetch(request);
        
        if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
        }
        
        return response;
    } catch (err) {
        return new Response('Offline', { status: 503 });
    }
}

// ============================================================
// MESSAGE HANDLING
// ============================================================

self.addEventListener('message', (e) => {
    const { type, data } = e.data || {};
    
    if (type === 'SKIP_WAITING') {
        self.skipWaiting();
        return;
    }
    
    if (type === 'RELOAD_DATA') {
        e.waitUntil(
            loadTricksData().then(data => {
                e.ports[0]?.postMessage({ success: true, data });
            }).catch(err => {
                e.ports[0]?.postMessage({ success: false, error: err.message });
            })
        );
        return;
    }
    
    if (type === 'GET_VERSION') {
        e.ports[0]?.postMessage({ version: VERSION });
        return;
    }
});

console.log('[SW] Service Worker v' + VERSION + ' loaded');
