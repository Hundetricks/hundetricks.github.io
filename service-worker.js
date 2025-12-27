// ============================================================
// HUNDETRICKS SERVICE WORKER - PRODUCTION v2.0
// ============================================================

const VERSION = '2.0';
const CACHE_STATIC = `static-v${VERSION}`;
const CACHE_DATA = `data-v${VERSION}`;
const CACHE_RUNTIME = `runtime-v${VERSION}`;
const DB_NAME = 'HundetricksDB';
const DB_VERSION = 1;

// ============================================================
// INDEXEDDB - Robust initialization with error handling
// ============================================================

function openDB() {
    return new Promise((resolve, reject) => {
        if (!self.indexedDB) {
            reject(new Error('IndexedDB not supported'));
            return;
        }
        
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onerror = () => {
            console.error('[SW] DB error:', request.error);
            reject(request.error);
        };
        
        request.onsuccess = () => {
            const db = request.result;
            db.onerror = (e) => console.error('[SW] DB error:', e);
            resolve(db);
        };
        
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            
            // Tricks data store
            if (!db.objectStoreNames.contains('tricks')) {
                const store = db.createObjectStore('tricks', { keyPath: 'id' });
                store.createIndex('timestamp', 'timestamp', { unique: false });
                store.createIndex('source', 'source', { unique: false });
            }
            
            // Learned tricks store
            if (!db.objectStoreNames.contains('learned')) {
                db.createObjectStore('learned', { keyPath: 'trickId' });
            }
            
            // Custom tricks store
            if (!db.objectStoreNames.contains('custom')) {
                db.createObjectStore('custom', { keyPath: 'id', autoIncrement: true });
            }
            
            // Backups store with index
            if (!db.objectStoreNames.contains('backups')) {
                const backupStore = db.createObjectStore('backups', { keyPath: 'id', autoIncrement: true });
                backupStore.createIndex('timestamp', 'timestamp', { unique: false });
            }
            
            console.log('[SW] DB upgraded to version', DB_VERSION);
        };
    });
}

async function saveToIDB(storeName, data) {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction([storeName], 'readwrite');
            const store = tx.objectStore(storeName);
            const request = store.put(data);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
            
            tx.oncomplete = () => db.close();
            tx.onerror = () => {
                db.close();
                reject(tx.error);
            };
        });
    } catch (err) {
        console.error('[SW] Save to IDB failed:', err);
        throw err;
    }
}

async function getFromIDB(storeName, key) {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction([storeName], 'readonly');
            const store = tx.objectStore(storeName);
            const request = store.get(key);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
            
            tx.oncomplete = () => db.close();
            tx.onerror = () => {
                db.close();
                reject(tx.error);
            };
        });
    } catch (err) {
        console.error('[SW] Get from IDB failed:', err);
        return null;
    }
}

async function getAllFromIDB(storeName) {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction([storeName], 'readonly');
            const store = tx.objectStore(storeName);
            const request = store.getAll();
            
            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
            
            tx.oncomplete = () => db.close();
            tx.onerror = () => {
                db.close();
                reject(tx.error);
            };
        });
    } catch (err) {
        console.error('[SW] GetAll from IDB failed:', err);
        return [];
    }
}

// ============================================================
// SMART JSON LOADING - Auto-detects best source with validation
// ============================================================

function validateTricksData(data) {
    if (!data || typeof data !== 'object') return false;
    if (!Array.isArray(data.anfänger) || !Array.isArray(data.fortgeschritten) || !Array.isArray(data.experten)) return false;
    return true;
}

async function loadTricksData() {
    console.log('[SW] Loading tricks data...');
    
    // 1. IndexedDB (fastest, offline)
    try {
        const idbData = await getFromIDB('tricks', 'current');
        if (idbData?.data && validateTricksData(idbData.data)) {
            console.log('[SW] ✓ Using cached data from IndexedDB');
            return idbData.data;
        }
    } catch (err) {
        console.warn('[SW] IndexedDB read failed:', err);
    }
    
    // 2. Local Hundetricks.json (priority)
    const localUrls = ['./Hundetricks.json', '/Hundetricks.json'];
    for (const url of localUrls) {
        try {
            const response = await fetch(url, { 
                cache: 'no-cache',
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                const data = await response.json();
                if (validateTricksData(data)) {
                    console.log('[SW] ✓ Using local JSON:', url);
                    await saveToIDB('tricks', { 
                        id: 'current', 
                        data, 
                        timestamp: Date.now(), 
                        source: 'local' 
                    });
                    return data;
                }
            }
        } catch (err) {
            console.log('[SW] Local JSON not available:', url);
        }
    }
    
    // 3. CDN fallback
    const cdnUrls = [
        'https://cdn.jsdelivr.net/gh/Digid0t/DigiDot_9@main/Hundetricks.json',
        'https://raw.githubusercontent.com/Digid0t/DigiDot_9/main/Hundetricks.json'
    ];
    
    for (const url of cdnUrls) {
        try {
            const response = await fetch(url, {
                cache: 'no-cache',
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                const data = await response.json();
                if (validateTricksData(data)) {
                    console.log('[SW] ✓ Using CDN:', url);
                    await saveToIDB('tricks', { 
                        id: 'current', 
                        data, 
                        timestamp: Date.now(), 
                        source: 'cdn' 
                    });
                    return data;
                }
            }
        } catch (err) {
            console.warn('[SW] CDN fetch failed:', url, err);
        }
    }
    
    // 4. Final fallback: Try cached IndexedDB again (even if invalid)
    try {
        const idbData = await getFromIDB('tricks', 'current');
        if (idbData?.data) {
            console.warn('[SW] ⚠ Using potentially outdated cached data');
            return idbData.data;
        }
    } catch (err) {}
    
    throw new Error('No data source available');
}

// ============================================================
// BACKUP SYSTEM - Automatic & Manual with rotation
// ============================================================

async function createBackup() {
    try {
        console.log('[SW] Creating backup...');
        
        const [tricks, learned, custom] = await Promise.allSettled([
            getFromIDB('tricks', 'current'),
            getAllFromIDB('learned'),
            getAllFromIDB('custom')
        ]);
        
        const backup = {
            timestamp: Date.now(),
            version: VERSION,
            tricks: tricks.status === 'fulfilled' ? tricks.value : null,
            learned: learned.status === 'fulfilled' ? learned.value : [],
            custom: custom.status === 'fulfilled' ? custom.value : []
        };
        
        const id = await saveToIDB('backups', backup);
        console.log('[SW] ✓ Backup created:', id);
        
        // Cleanup: Keep only last 5 backups
        const allBackups = await getAllFromIDB('backups');
        if (allBackups.length > 5) {
            const sorted = allBackups.sort((a, b) => b.timestamp - a.timestamp);
            const db = await openDB();
            const tx = db.transaction(['backups'], 'readwrite');
            const store = tx.objectStore('backups');
            
            for (let i = 5; i < sorted.length; i++) {
                store.delete(sorted[i].id);
            }
            
            await new Promise((resolve) => {
                tx.oncomplete = resolve;
                tx.onerror = resolve;
            });
            db.close();
            
            console.log('[SW] Cleaned up old backups, kept latest 5');
        }
        
        return backup;
    } catch (err) {
        console.error('[SW] Backup failed:', err);
        return null;
    }
}

async function getLatestBackup() {
    try {
        const backups = await getAllFromIDB('backups');
        return backups.sort((a, b) => b.timestamp - a.timestamp)[0] || null;
    } catch (err) {
        console.error('[SW] Get latest backup failed:', err);
        return null;
    }
}

async function restoreBackup(backupId) {
    try {
        console.log('[SW] Restoring backup:', backupId);
        
        const backup = await getFromIDB('backups', backupId);
        if (!backup) {
            throw new Error('Backup not found');
        }
        
        const results = await Promise.allSettled([
            backup.tricks ? saveToIDB('tricks', backup.tricks) : Promise.resolve(),
            backup.learned ? Promise.all(backup.learned.map(item => saveToIDB('learned', item))) : Promise.resolve(),
            backup.custom ? Promise.all(backup.custom.map(item => saveToIDB('custom', item))) : Promise.resolve()
        ]);
        
        const failed = results.filter(r => r.status === 'rejected');
        if (failed.length > 0) {
            console.warn('[SW] Some restore operations failed:', failed);
        }
        
        console.log('[SW] ✓ Backup restored');
        return true;
    } catch (err) {
        console.error('[SW] Restore failed:', err);
        throw err;
    }
}

// ============================================================
// CACHING STRATEGIES
// ============================================================

async function networkFirst(request) {
    const url = request.url;
    
    try {
        const response = await fetch(request, {
            cache: 'no-cache'
        });
        
        if (response.ok) {
            const cache = await caches.open(CACHE_DATA);
            cache.put(request, response.clone()).catch(err => 
                console.warn('[SW] Cache put failed:', err)
            );
        }
        
        return response;
    } catch (err) {
        console.log('[SW] Network failed, trying cache:', url);
        
        // Try cache
        const cached = await caches.match(request);
        if (cached) {
            console.log('[SW] ✓ Serving from cache');
            return cached;
        }
        
        // Special: JSON data from IndexedDB
        if (url.includes('.json') || url.includes('Hundetricks')) {
            try {
                const data = await loadTricksData();
                return new Response(JSON.stringify(data), {
                    status: 200,
                    headers: { 
                        'Content-Type': 'application/json',
                        'X-Cache-Source': 'IndexedDB'
                    }
                });
            } catch (idbErr) {
                console.error('[SW] All sources failed');
            }
        }
        
        // Final fallback: Simple offline response
        return new Response(JSON.stringify({ 
            error: 'Offline', 
            message: 'Bitte verbinden Sie sich mit dem Internet' 
        }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

async function cacheFirst(request) {
    const cached = await caches.match(request);
    
    if (cached) {
        // Update in background
        fetch(request).then(response => {
            if (response.ok) {
                caches.open(CACHE_RUNTIME).then(cache => {
                    cache.put(request, response).catch(err => 
                        console.warn('[SW] Background cache update failed:', err)
                    );
                });
            }
        }).catch(() => {});
        
        return cached;
    }
    
    try {
        const response = await fetch(request);
        
        if (response.ok) {
            const cache = await caches.open(CACHE_RUNTIME);
            cache.put(request, response.clone()).catch(err =>
                console.warn('[SW] Cache put failed:', err)
            );
        }
        
        return response;
    } catch (err) {
        console.error('[SW] Fetch failed:', err);
        throw err;
    }
}

// ============================================================
// INSTALL
// ============================================================

self.addEventListener('install', (e) => {
    console.log('[SW] Installing v' + VERSION);
    
    e.waitUntil((async () => {
        try {
            // Initialize DB
            await openDB();
            console.log('[SW] ✓ DB initialized');
            
            // Pre-cache static files
            const cache = await caches.open(CACHE_STATIC);
            await cache.addAll(['./']);
            console.log('[SW] ✓ Static cache created');
            
            // Skip waiting
            await self.skipWaiting();
            console.log('[SW] ✓ Installation complete');
        } catch (err) {
            console.error('[SW] Installation error:', err);
        }
    })());
});

// ============================================================
// ACTIVATE
// ============================================================

self.addEventListener('activate', (e) => {
    console.log('[SW] Activating v' + VERSION);
    
    e.waitUntil((async () => {
        try {
            // Clean old caches
            const keys = await caches.keys();
            const deleted = await Promise.all(
                keys.filter(k => 
                    (k.startsWith('static-') || k.startsWith('data-') || k.startsWith('runtime-')) &&
                    !k.includes(VERSION)
                ).map(k => {
                    console.log('[SW] Deleting old cache:', k);
                    return caches.delete(k);
                })
            );
            console.log('[SW] ✓ Cleaned', deleted.length, 'old caches');
            
            // Take control
            await self.clients.claim();
            console.log('[SW] ✓ Claimed clients');
            
            // Auto-backup
            await createBackup();
            
            // Notify clients
            const clients = await self.clients.matchAll();
            clients.forEach(client => {
                client.postMessage({ 
                    type: 'ACTIVATED', 
                    version: VERSION 
                });
            });
            
            console.log('[SW] ✓ Activation complete');
        } catch (err) {
            console.error('[SW] Activation error:', err);
        }
    })());
});

// ============================================================
// FETCH
// ============================================================

self.addEventListener('fetch', (e) => {
    const { request } = e;
    const url = new URL(request.url);
    
    // Only handle http(s)
    if (!url.protocol.startsWith('http')) return;
    
    // JSON data: Network First with IndexedDB fallback
    if (url.pathname.endsWith('.json')) {
        e.respondWith(networkFirst(request));
        return;
    }
    
    // Navigation: Network First
    if (request.mode === 'navigate') {
        e.respondWith(
            networkFirst(request).catch(() => 
                caches.match('./') || 
                new Response('<!DOCTYPE html><html><body><h1>Offline</h1><p>Bitte laden Sie die App neu wenn Sie online sind.</p></body></html>', {
                    headers: { 'Content-Type': 'text/html' }
                })
            )
        );
        return;
    }
    
    // Everything else: Cache First
    e.respondWith(cacheFirst(request));
});

// ============================================================
// BACKGROUND SYNC
// ============================================================

self.addEventListener('sync', (e) => {
    console.log('[SW] Background sync:', e.tag);
    
    if (e.tag === 'backup') {
        e.waitUntil(createBackup());
    }
    
    if (e.tag === 'sync-data') {
        e.waitUntil(loadTricksData());
    }
});

// ============================================================
// MESSAGE HANDLING
// ============================================================

self.addEventListener('message', (e) => {
    const { type, data } = e.data || {};
    
    if (type === 'CREATE_BACKUP') {
        e.waitUntil(
            createBackup().then(backup => {
                e.ports[0]?.postMessage({ 
                    success: !!backup, 
                    backup 
                });
            })
        );
        return;
    }
    
    if (type === 'GET_LATEST_BACKUP') {
        e.waitUntil(
            getLatestBackup().then(backup => {
                e.ports[0]?.postMessage({ backup });
            })
        );
        return;
    }
    
    if (type === 'GET_ALL_BACKUPS') {
        e.waitUntil(
            getAllFromIDB('backups').then(backups => {
                e.ports[0]?.postMessage({ 
                    backups: backups.sort((a, b) => b.timestamp - a.timestamp) 
                });
            })
        );
        return;
    }
    
    if (type === 'RESTORE_BACKUP') {
        e.waitUntil(
            restoreBackup(data?.backupId).then(success => {
                e.ports[0]?.postMessage({ success });
            }).catch(err => {
                e.ports[0]?.postMessage({ 
                    success: false, 
                    error: err.message 
                });
            })
        );
        return;
    }
    
    if (type === 'SKIP_WAITING') {
        self.skipWaiting();
        return;
    }
    
    if (type === 'RELOAD_DATA') {
        e.waitUntil(
            loadTricksData().then(data => {
                e.ports[0]?.postMessage({ 
                    success: !!data, 
                    data 
                });
            }).catch(err => {
                e.ports[0]?.postMessage({ 
                    success: false, 
                    error: err.message 
                });
            })
        );
        return;
    }
});

// ============================================================
// ERROR HANDLING
// ============================================================

self.addEventListener('error', (e) => {
    console.error('[SW] Error:', e.error);
});

self.addEventListener('unhandledrejection', (e) => {
    console.error('[SW] Unhandled rejection:', e.reason);
});

console.log('[SW] Loaded v' + VERSION);
