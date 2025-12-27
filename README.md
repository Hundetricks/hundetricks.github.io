# Hundetricks PWA

## 3 Dateien - Perfekt abgestimmt

```
index.html           ✅ Haupt-App
service-worker.js    ✅ PWA-Logik
manifest.json        ✅ App-Config
```

## Features

**Smart Data Loading**
- IndexedDB (offline)
- Lokale JSON (Priorität)
- CDN (Fallback)

**Auto-Backup**
- Bei Start
- Bei Schließen
- Manuell
- Max 5, rotierend

**Fehlerbehandlung**
- Validation
- Timeouts
- Fallbacks
- User-Feedback

## Deployment

1. Icons erstellen: https://www.pwabuilder.com/imageGenerator
2. GitHub Pages / Netlify
3. Fertig!

## JSON-Datei

**3 Optionen:**
- Im selben Ordner (`./Hundetricks.json`)
- CDN (automatisch)
- Upload in App

Service Worker wählt automatisch die beste Quelle.

## Backup

- **Speicherort**: IndexedDB (Browser-intern)
- **Auto-Rotation**: Letzte 5 behalten
- **Konsistenz**: Neuestes wird verwendet
- **Export/Import**: Über Backup-Manager

## Garantien

✅ Offline-fähig
✅ Keine Konflikte
✅ Auto-Cleanup
✅ Validation
✅ User-Feedback
✅ Cross-Browser
