🐾 Hundetricks - Das intelligente Trainingskompendium

![alt text](https://img.shields.io/badge/Version-2.0-green)


![alt text](https://img.shields.io/badge/Technologie-PWA_%7C_Offline_Ready-blue)


![alt text](https://img.shields.io/badge/Lizenz-MIT-lightgrey)

Hundetricks ist eine moderne Web-Applikation, die Hundebesitzer beim systematischen Training unterstützt. Sie funktioniert wie eine native App, speichert Daten lokal und bietet Zugriff auf über 120 Tricks – überall, auch im Wald ohne Internet.

🔗 Hier klicken zur Live-App
🧭 Die Navigationsleiste (Nav Bar) – Deine Kommandozentrale

Die Navigationsleiste am oberen Bildschirmrand ist das Herzstück der Anwendung. Sie ist "Sticky" (klebt am oberen Rand), damit du jederzeit Zugriff auf alle wichtigen Funktionen hast, egal wie tief du gescrollt hast.

Sie ist in zwei Bereiche unterteilt: Die Hauptleiste (immer sichtbar) und den Erweiterungsbereich (klappbar).
1. Die Hauptleiste (Obere Zeile)
Element	Symbol	Funktion & Detail-Logik
Menü / Burger	☰	Öffnet die Seiten-Navigation. Hier siehst du alle Kategorien (Anfänger, Fortgeschritten, Profi) als Liste. <br>👉 Besonderheit: Gelernte Tricks sind auch hier im Menü grün markiert, damit du schnell zu noch offenen Tricks springen kannst.
Titel & Status	🐾	Zeigt den App-Namen. Im "eingeklappten Zustand" (beim Scrollen) erscheint hier zusätzlich eine Mini-Fortschrittsleiste, damit du deinen Lernstatus immer im Blick hast.
Collapse Toggle	▼	Klappt den Erweiterungsbereich (Suche & großer Balken) manuell ein oder aus. <br>👉 Automatik: Beim Runterscrollen klappt die App diesen Bereich automatisch ein, um Platz auf dem Handy-Display zu sparen.
Statistik Badge	15 / 120	Ein Live-Counter. <br>• Links: Anzahl der gelernten Tricks.<br>• Rechts: Gesamtzahl aller verfügbaren Tricks.<br>Aktualisiert sich in Echtzeit bei jedem Klick.
Dark Mode	🌙 / ☀️	Schaltet das gesamte Design um. <br>• Dunkel: Perfekt für abends, schont die Augen (Dunkelgrün/Grau Töne).<br>• Hell: Hoher Kontrast für draußen bei Sonnenlicht.<br>👉 Logik: Die Einstellung wird gespeichert und beim nächsten Besuch automatisch geladen.
Einstellungen	⚙️	Öffnet das Konfigurations-Menü. Hier findest du Backups, Sprach-Einstellungen (TTS Geschwindigkeit) und Datenbank-Updates.
Neuer Trick	➕	Öffnet den "Creator Mode". Hier kannst du eigene Tricks erfinden, die nicht in der Datenbank stehen. Diese werden permanent in deinem Browser gespeichert.
2. Der Erweiterungsbereich (Ausklappbar)

Dieser Bereich befindet sich direkt unter der Hauptleiste:

    🔍 Intelligente Suche:

        Filtert die Liste in Echtzeit.

        Durchsucht Titel, Beschreibungen und versteckte Schlagworte.

        Öffnet automatisch die passenden Kategorien, wenn ein Treffer gefunden wird.

    📊 Detaillierter Fortschritt:

        Zeigt einen großen Prozentbalken (z.B. "12% Komplett").

        Besitzt einen eigenen Lautsprecher-Button (🔊): Die App liest dir deinen aktuellen Motivations-Status laut vor.

✅ Die "Abgehakt"-Funktion: Was passiert im Detail?

Wenn du einen Trick erfolgreich trainiert hast und den Schalter ("Als gelernt markieren") unten rechts auf der Karte betätigst, löst das eine komplexe Kette von Ereignissen aus:
1. Visuelles Feedback (UI)

    Karte: Die gesamte Karte erhält einen grünen Farbverlauf und einen grünen Rand.

    Badge: Ein großes "✓" Badge erscheint oben rechts auf der Karte.

    Titel: Der Name des Tricks wird leicht durchgestrichen (visuelle Bestätigung "Erledigt").

    Button: Der Text wechselt von "Als gelernt markieren" zu "Gelernt!" und der Schalter rutscht nach rechts (aktiv).

2. Daten-Verarbeitung (Logik)

    ID-Speicherung: Die einzigartige ID des Tricks (z.B. 001) wird in eine interne Liste (Set) aufgenommen.

    Persistenz (Speichern): Diese Liste wird sofort in den LocalStorage deines Browsers geschrieben (dogTricksLearned).

        Bedeutung: Auch wenn du den Browser schließt oder das Handy neustartest, bleibt das Häkchen gesetzt.

3. Globale Auswirkungen

    Statistik-Update: Der Zähler in der Nav Bar springt sofort um eins hoch (z.B. von 15 auf 16).

    Fortschrittsbalken: Der grüne Balken wächst prozentual an.

    Navigations-Menü: Auch im Burger-Menü wird dieser Trick nun grün hinterlegt markiert.

🚀 Weitere Kernfunktionen
🔊 Text-to-Speech (Sprachausgabe)

Die App ist barrierefrei konzipiert.

    Vorlese-Button: Jede Karte hat einen Lautsprecher.

    Intelligenz: Die App liest nicht den gesamten technischen Text vor, sondern fasst intelligent zusammen: Titel + Kategorie + Handzeichen (kurz) + Ablauf (kurz).

    Steuerung: Über die Einstellungen kannst du Geschwindigkeit, Tonhöhe und Lautstärke anpassen.

📡 Offline-First & Updates

    Kein Internet nötig: Nach dem ersten Laden speichert der Service Worker alle Dateien (HTML, CSS, JSON, Bilder) auf deinem Gerät.

    Daten-Hierarchie: Beim Start prüft die App intelligent:

        Gibt es ein Update auf GitHub?

        Wenn nein/offline: Lade Daten aus dem Cache.

        Wenn Cache leer: Lade lokale Backups.

📂 Backup & Datensicherheit

Da die App keine Daten in eine Cloud sendet (Privatsphäre!), bist du Herr deiner Daten.

    Backup erstellen: Erzeugt eine .json Datei mit all deinen gelernten Tricks und selbst erstellen Tricks.

    Wiederherstellen: Lädt diesen Stand auf jedem beliebigen anderen Gerät wieder ein.

🛠️ Technische Struktur (Für Entwickler)

Das Projekt basiert auf Vanilla JavaScript (keine Frameworks), um maximale Performance und Langlebigkeit zu garantieren.
Dateistruktur

    index.html: Enthält die gesamte Logik (JS) und das Design (CSS) in einer Datei für einfache Portabilität.

    Hundetricks.json: Die Datenbank. Hier sind alle ~120 Tricks strukturiert abgelegt.

    manifest.json & service-worker.js: Ermöglichen die Installation als App (PWA) und den Offline-Modus.

Anpassung der Daten (Hundetricks.json)

Jeder Trick ist ein JSON-Objekt. Um einen Fehler zu korrigieren oder einen Trick hinzuzufügen, muss nur diese Datei bearbeitet werden:
code JSON

    
{
  "id": "unique_id",
  "kategorie": "Anfänger",
  "titel": "Name",
  "handzeichen": "Langer Text...",
  "handzeichen_kurz": "Kurzer Text für die Karte...",
  "bewegungsablauf": "...",
  "endposition": "...",
  "trainingstipps": "..."
}

  

Entwickelt mit ❤️ für Hunde und ihre Menschen.
