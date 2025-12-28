# 🐾 Hundetricks - Professionelles Trainingskompendium

<div align="center">

![Version](https://img.shields.io/badge/Version-2.0-success?style=for-the-badge)
![PWA](https://img.shields.io/badge/PWA-Offline_Ready-blue?style=for-the-badge)
![License](https://img.shields.io/badge/Lizenz-MIT-lightgrey?style=for-the-badge)
![Tricks](https://img.shields.io/badge/Tricks-120+-orange?style=for-the-badge)

**Eine moderne Progressive Web App für systematisches Hundetraining**

[🚀 Live-Demo](https://hundetricks.github.io/) • [📖 Dokumentation](#dokumentation) • [💾 Download](#installation) • [🐛 Issues](https://github.com/Hundetricks/hundetricks.github.io/issues)

</div>

---

## 📋 Inhaltsverzeichnis

- [Über das Projekt](#-über-das-projekt)
- [Features im Überblick](#-features-im-überblick)
- [Installation & Erste Schritte](#-installation--erste-schritte)
- [Bedienungsanleitung](#-bedienungsanleitung)
  - [Die Navigationsleiste](#1-die-navigationsleiste)
  - [Tricks durchstöbern](#2-tricks-durchstöbern--lernen)
  - [Suchfunktion](#3-intelligente-suchfunktion)
  - [Eigene Tricks erstellen](#4-eigene-tricks-erstellen)
  - [Fortschritt verfolgen](#5-fortschritt-verfolgen)
- [Einstellungen im Detail](#️-einstellungen-im-detail)
  - [JSON-Verwaltung](#1-json-verwaltung)
  - [Backup-System](#2-backup-system)
  - [Offline-Modus](#3-offline-modus)
  - [Sprachausgabe](#4-sprachausgabe-barrierefreiheit)
  - [App-Installation](#5-app-installation-pwa)
  - [Daten zurücksetzen](#6-daten-zurücksetzen)
- [Offline-Funktionalität](#-offline-funktionalität)
- [Backup & Restore](#-backup--restore-detailliert)
- [Technische Details](#-technische-details)
- [FAQ](#-häufig-gestellte-fragen)
- [Für Entwickler](#-für-entwickler)
- [Lizenz](#-lizenz)

---

## 🎯 Über das Projekt

**Hundetricks** ist eine speziell entwickelte Progressive Web App (PWA), die Hundebesitzer beim systematischen Training ihrer Vierbeiner unterstützt. Die App kombiniert eine umfangreiche Datenbank mit über 120 Tricks mit intelligenter Fortschrittsverfolgung und funktioniert vollständig offline – perfekt für das Training im Park oder Wald.

### Warum Hundetricks?

- ✅ **Offline-First**: Funktioniert auch ohne Internetverbindung
- ✅ **Datenschutz**: Alle Daten bleiben lokal auf deinem Gerät
- ✅ **Flexibel**: Erweiterbar durch eigene JSON-Dateien
- ✅ **Barrierefrei**: Text-to-Speech für alle Inhalte
- ✅ **Cross-Platform**: Funktioniert auf allen Geräten (Handy, Tablet, PC)
- ✅ **Kein Account nötig**: Einfach öffnen und loslegen

---

## ✨ Features im Überblick

### 🎓 Trainingsfunktionen

| Feature | Beschreibung |
|---------|--------------|
| **120+ Tricks** | Professionell kategorisiert in Anfänger, Fortgeschritten und Profi |
| **Detaillierte Anleitungen** | Jeder Trick enthält: Handzeichen, Bewegungsablauf, Endposition und Trainingstipps |
| **Fortschrittsverfolgung** | Markiere erledigte Tricks und verfolge deinen Trainingserfolg |
| **Eigene Tricks** | Erstelle und speichere deine individuellen Trainingsideen |
| **Intelligente Suche** | Finde Tricks nach Schlagworten, auch in Beschreibungen |

### 🛠️ Technische Features

| Feature | Beschreibung |
|---------|--------------|
| **PWA (Progressive Web App)** | Installierbar wie eine native App |
| **Offline-Modus** | Vollständig nutzbar ohne Internet |
| **Dark Mode** | Augenschonender Dunkelmodus |
| **Responsive Design** | Optimiert für alle Bildschirmgrößen |
| **Service Worker** | Automatisches Caching für schnellen Zugriff |
| **Text-to-Speech** | Sprachausgabe mit einstellbarer Geschwindigkeit |
| **JSON-basiert** | Einfach erweiterbar und anpassbar |
| **Backup-System** | Sichere deine Daten lokal |

---

## 🚀 Installation & Erste Schritte

### Option 1: Direkt im Browser nutzen

1. Öffne [https://hundetricks.github.io/](https://hundetricks.github.io/)
2. Die App lädt automatisch alle Daten
3. Fertig! Du kannst sofort loslegen

### Option 2: Als App installieren (empfohlen)

#### Auf dem Smartphone:

**Android (Chrome/Edge):**
1. Öffne die Website in Chrome oder Edge
2. Tippe auf das Menü (⋮) → "Zum Startbildschirm hinzufügen"
3. Bestätige mit "Hinzufügen"
4. Die App erscheint nun wie eine normale App auf deinem Homescreen

**iOS (Safari):**
1. Öffne die Website in Safari
2. Tippe auf das Teilen-Symbol (□↑)
3. Scrolle nach unten und wähle "Zum Home-Bildschirm"
4. Bestätige mit "Hinzufügen"

#### Auf dem Desktop:

**Chrome/Edge:**
1. Öffne die Website
2. Klicke in der Adressleiste auf das Install-Symbol (⊕) oder
3. Gehe zu Menü (⋮) → "Hundetricks installieren"

### Option 3: Lokale Installation

```bash
# Repository klonen
git clone https://github.com/Hundetricks/hundetricks.github.io.git

# In Verzeichnis wechseln
cd hundetricks.github.io

# index.html im Browser öffnen
# Oder lokalen Webserver starten (z.B. mit Python):
python -m http.server 8000
# Dann: http://localhost:8000 im Browser öffnen
```

---

## 📖 Bedienungsanleitung

### 1. Die Navigationsleiste

Die Navigationsleiste ist deine Kommandozentrale und bleibt immer am oberen Bildschirmrand sichtbar ("sticky"). Sie besteht aus zwei Bereichen:

#### 🔝 Hauptleiste (immer sichtbar)

<table>
<thead>
<tr>
<th>Symbol</th>
<th>Element</th>
<th>Funktion</th>
</tr>
</thead>
<tbody>
<tr>
<td>☰</td>
<td><strong>Menü / Burger</strong></td>
<td>
• Öffnet die Seitennavigation<br>
• Zeigt alle Kategorien (Anfänger, Fortgeschritten, Profi)<br>
• Gelernte Tricks sind <strong>grün markiert</strong><br>
• Klicke auf eine Kategorie, um dorthin zu springen
</td>
</tr>
<tr>
<td>🐾</td>
<td><strong>Titel & Status</strong></td>
<td>
• Zeigt den App-Namen<br>
• Im eingeklappten Zustand: Mini-Fortschrittsleiste<br>
• Klicke drauf, um nach oben zu scrollen
</td>
</tr>
<tr>
<td>▼</td>
<td><strong>Collapse-Toggle</strong></td>
<td>
• Klappt Suchbereich manuell ein/aus<br>
• Automatik: Beim Scrollen nach unten wird automatisch eingeklappt<br>
• Spart Platz auf kleinen Displays
</td>
</tr>
<tr>
<td>15/120</td>
<td><strong>Statistik-Badge</strong></td>
<td>
• Live-Counter deines Fortschritts<br>
• Links: Anzahl gelernter Tricks<br>
• Rechts: Gesamtzahl aller Tricks<br>
• Aktualisiert sich in Echtzeit
</td>
</tr>
<tr>
<td>🌙</td>
<td><strong>Dark Mode</strong></td>
<td>
• Umschalten zwischen Hell- und Dunkelmodus<br>
• 🌙 = Dunkler Modus (abends)<br>
• ☀️ = Heller Modus (tagsüber)<br>
• Einstellung wird gespeichert
</td>
</tr>
<tr>
<td>⚙️</td>
<td><strong>Einstellungen</strong></td>
<td>
• Öffnet das komplette Einstellungsmenü<br>
• Backup, JSON-Verwaltung, Sprachausgabe, etc.<br>
• Siehe <a href="#️-einstellungen-im-detail">Einstellungen im Detail</a>
</td>
</tr>
<tr>
<td>➕</td>
<td><strong>Neuer Trick</strong></td>
<td>
• Öffnet den Creator-Modus<br>
• Erstelle eigene Tricks<br>
• Siehe <a href="#4-eigene-tricks-erstellen">Eigene Tricks erstellen</a>
</td>
</tr>
</tbody>
</table>

#### 📊 Erweiterungsbereich (ausklappbar)

Dieser Bereich befindet sich direkt unter der Hauptleiste:

- **🔍 Intelligente Suche**
  - Filtert die Tricks in Echtzeit
  - Durchsucht Titel, Beschreibungen und Schlagworte
  - Öffnet automatisch die passenden Kategorien

- **📊 Detaillierter Fortschritt**
  - Großer Prozentbalken (z.B. "12% Komplett")
  - Zeigt visuelle Statistik
  - 🔊 Button: Lässt dir deinen Fortschritt vorlesen

---

### 2. Tricks durchstöbern & lernen

#### Struktur der Tricks

Die Tricks sind in drei Schwierigkeitskategorien unterteilt:

| Kategorie | Farbe | Beschreibung |
|-----------|-------|--------------|
| **Anfänger** | 🟢 Grün | Einfache Grundkommandos für den Einstieg |
| **Fortgeschritten** | 🟡 Gelb | Komplexere Tricks, die auf Grundlagen aufbauen |
| **Profi** | 🔴 Rot | Anspruchsvolle Tricks für erfahrene Hunde-Trainer-Teams |

#### Anatomie einer Trick-Karte

Jeder Trick wird als aufklappbare Karte dargestellt:

```
┌─────────────────────────────────────┐
│ 🟢 ANFÄNGER             🔊    ✓     │  ← Header mit Kategorie, TTS, Checkbox
├─────────────────────────────────────┤
│ Sitz                                │  ← Titel des Tricks
│ Kurz-Beschreibung...                │  ← Handzeichen (kurz)
│                                     │
│ [Mehr anzeigen ▼]                   │  ← Aufklappen-Button
└─────────────────────────────────────┘

Nach dem Aufklappen:
┌─────────────────────────────────────┐
│ 🟢 ANFÄNGER             🔊    ✓     │
├─────────────────────────────────────┤
│ Sitz                                │
│                                     │
│ 📋 Handzeichen:                     │
│ Detaillierte Beschreibung...        │
│                                     │
│ 🎬 Bewegungsablauf:                 │
│ Schritt-für-Schritt Anleitung...   │
│                                     │
│ 📍 Endposition:                     │
│ Beschreibung der finalen Haltung... │
│                                     │
│ 💡 Trainingstipps:                  │
│ Hilfreiche Tipps für das Training...│
│                                     │
│ [Weniger anzeigen ▲]               │
│                                     │
│ ☐ Als gelernt markieren             │  ← Toggle Switch
└─────────────────────────────────────┘
```

#### So markierst du einen Trick als gelernt:

1. **Finde den Trick**, den du erfolgreich trainiert hast
2. **Klappe die Karte auf** (falls geschlossen)
3. **Aktiviere den Toggle** unten rechts: "Als gelernt markieren"

**Was passiert jetzt?**

✨ **Visuelles Feedback:**
- Die Karte erhält einen **grünen Rahmen** und Farbverlauf
- Ein großes **✓ Badge** erscheint oben rechts
- Der Titel wird leicht **durchgestrichen**
- Der Button zeigt nun "**Gelernt!**" (grün)

📊 **Automatische Updates:**
- Der Zähler in der Navigation springt hoch (z.B. 15 → 16)
- Der Fortschrittsbalken wächst
- Im Burger-Menü wird der Trick grün markiert

💾 **Permanente Speicherung:**
- Deine Markierung wird **sofort im Browser gespeichert**
- Bleibt erhalten, auch wenn du die App schließt
- Wird in dein Backup aufgenommen

#### Trick als "nicht gelernt" zurücksetzen:

- Klicke einfach **erneut** auf den grünen "Gelernt!" Toggle
- Die Markierung wird entfernt
- Alle Statistiken aktualisieren sich automatisch

---

### 3. Intelligente Suchfunktion

Die Suchfunktion findet Tricks in **Echtzeit** und ist extrem mächtig:

#### So funktioniert die Suche:

1. **Klicke in das Suchfeld** (🔍) im Erweiterungsbereich
2. **Tippe Suchbegriffe** ein
3. **Die App filtert sofort** alle Tricks

#### Was wird durchsucht?

- ✅ Titel des Tricks
- ✅ Handzeichen (kurz und lang)
- ✅ Bewegungsablauf
- ✅ Endposition
- ✅ Trainingstipps
- ✅ Versteckte Schlagworte (falls vorhanden)

#### Intelligente Features:

- **Automatisches Öffnen:** Kategorien mit Treffern werden automatisch aufgeklappt
- **Echtzeit:** Keine Enter-Taste nötig, Ergebnisse erscheinen beim Tippen
- **Groß-/Kleinschreibung egal:** "SITZ" = "sitz" = "SiTz"
- **Teilwort-Suche:** "Pf" findet "Pfote geben"

#### Beispiele:

| Suche | Findet |
|-------|--------|
| `sitz` | Alle Tricks mit "Sitz" im Titel/Text |
| `pf` | "Pfote geben", "Pfötchen" etc. |
| `spring` | "Springer", "Durch Reifen springen" etc. |
| `rolle` | "Rolle", "Fassrolle" etc. |

**💡 Tipp:** Nutze die Suche, wenn du nur ungefähr weißt, wie der Trick heißt!

---

### 4. Eigene Tricks erstellen

Du hast einen Trick erfunden, der nicht in der Datenbank ist? Kein Problem!

#### Schritt-für-Schritt:

1. **Klicke auf ➕ "Neuer Trick"** in der Navigation
2. **Fülle das Formular aus:**

```
┌────────────────────────────────────┐
│ ➕ Neuer Trick                     │
├────────────────────────────────────┤
│                                    │
│ Kategorie: [Anfänger ▼]           │
│ ┌─────────────────────────────┐   │
│ │ ○ Anfänger (Green)          │   │
│ │ ○ Fortgeschritten (Yellow)  │   │
│ │ ○ Profi (Red)               │   │
│ └─────────────────────────────┘   │
│                                    │
│ Titel des Tricks *                 │
│ [_________________________]        │
│                                    │
│ ✋ Handzeichen                     │
│ [_________________________]        │
│ [_________________________]        │
│                                    │
│ 🎬 Bewegungsablauf                │
│ [_________________________]        │
│ [_________________________]        │
│ [_________________________]        │
│                                    │
│ 📍 Endposition                    │
│ [_________________________]        │
│ [_________________________]        │
│                                    │
│ 💡 Trainingstipps                 │
│ [_________________________]        │
│ [_________________________]        │
│                                    │
│ [✅ Trick speichern]              │
└────────────────────────────────────┘
```

3. **Pflichtfeld:** Nur der **Titel** ist verpflichtend (*)
4. **Klicke auf "Trick speichern"**

#### Was passiert nach dem Speichern?

✨ **Sofort sichtbar:**
- Dein Trick erscheint in der gewählten Kategorie
- Er wird mit einem speziellen Symbol markiert (📝 "Eigener Trick")
- Vollständig funktional wie alle anderen Tricks

💾 **Permanente Speicherung:**
- Wird in deinem Browser-LocalStorage gespeichert
- Bleibt auch nach Schließen der App erhalten
- Wird in dein Backup aufgenommen

🗑️ **Löschen:**
- Eigene Tricks können wieder gelöscht werden
- Klicke auf das 🗑️ Symbol in der Trick-Karte

**💡 Tipp:** Nutze die Trainingstipps-Sektion für persönliche Notizen zu jedem Trick!

---

### 5. Fortschritt verfolgen

Dein Trainingsfortschritt wird auf **drei Arten** visualisiert:

#### 1️⃣ Badge-Counter in der Navigation

```
┌──────────┐
│ 15 / 120 │  ← Gelernte / Gesamt-Tricks
└──────────┘
```

- Live-Update bei jeder Markierung
- Zeigt Verhältnis auf einen Blick

#### 2️⃣ Prozentualer Fortschrittsbalken

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
█████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  12% Komplett
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

- Detaillierte Prozentanzeige
- Grüner Balken wächst mit jedem gelernten Trick
- 🔊 Button: Lässt dir deinen Fortschritt vorlesen

#### 3️⃣ Visuelle Markierung im Burger-Menü

```
☰ Menü
├─ 📁 Anfänger
│  ├─ ✓ Sitz (gelernt)
│  ├─ ✓ Platz (gelernt)
│  └─   Bei Fuß
├─ 📁 Fortgeschritten
│  ├─ ✓ Rolle (gelernt)
│  └─   Slalom
└─ 📁 Profi
   └─   Rückwärts durch die Beine
```

- Gelernte Tricks = Grün + ✓
- Nicht gelernte Tricks = Normal

**💡 Motivationstipp:** Nutze die Sprachausgabe-Funktion des Fortschrittsbalkens für extra Motivation!

---

## ⚙️ Einstellungen im Detail

Öffne die Einstellungen über das ⚙️ Symbol in der Navigation. Hier findest du alle Konfigurationsmöglichkeiten:

### 1. JSON-Verwaltung

#### 📥 JSON laden

Die App kann Tricks aus verschiedenen Quellen laden:

##### **Option A: Vom Gerät laden**

1. Klicke auf **"📁 Vom Gerät"**
2. Wähle eine JSON-Datei von deinem Gerät
3. Die Tricks werden **sofort geladen und angezeigt**

**Wann nutzen?**
- Du hast eine eigene Trick-Sammlung als JSON
- Du möchtest eine ältere Version der Datenbank nutzen
- Offline-Nutzung mit lokaler Datei

##### **Option B: Von URL laden**

1. Gib eine **URL** zur JSON-Datei ein
2. Klicke auf **"🔗 Von URL laden"**
3. Die App lädt die Datei automatisch

**Unterstützte URLs:**
- ✅ Direkte Links zu `.json` Dateien
- ✅ GitHub Raw-Links
- ✅ GitHub Repository-Links (werden automatisch konvertiert)
- ✅ Eigene Server

**Beispiel-URLs:**
```
https://raw.githubusercontent.com/USER/REPO/main/tricks.json
https://github.com/USER/REPO/blob/main/tricks.json  (wird automatisch konvertiert)
https://meine-domain.de/hundetricks.json
```

**💡 Intelligente URL-Erkennung:**
Die App testet bei GitHub-URLs automatisch alle Varianten:
- Raw-URL
- Blob-URL
- RawHack-URL
- Repository-Root

##### **📦 ZIP Download**

- Downloadet das komplette Repository als ZIP
- Nützlich für komplette Offline-Kopie
- Enthält HTML, CSS, JS und JSON

---

### 2. Backup-System

Das Backup-System ist das **Herzstück** der Datensicherheit. Es gibt zwei Arten von Backups:

#### 💾 Vollständiges Backup (empfohlen!)

**Was wird gesichert?**
- ✅ Alle gelernten Tricks (IDs)
- ✅ Alle selbst erstellten Tricks (komplett)
- ✅ Die komplette aktuelle Datenbank
- ✅ Einstellungen (Dark Mode, TTS-Präferenzen)
- ✅ Metadaten (Erstellungsdatum, Version)

**Schritt-für-Schritt:**

1. **Backup erstellen:**
   ```
   1. Klicke auf "💾 Vollständiges Backup erstellen"
   2. Eine Datei wird heruntergeladen:
      → hundetricks-full-backup-2024-12-28.json
   3. Speichere diese Datei sicher (Cloud, USB, etc.)
   ```

2. **Backup wiederherstellen:**
   ```
   1. Klicke auf "📂 Backup laden"
   2. Wähle deine Backup-Datei
   3. Bestätige die Wiederherstellung
   4. ✅ Alle Daten sind wiederhergestellt!
   ```

**Wann solltest du ein Backup erstellen?**
- 📅 Regelmäßig (z.B. monatlich)
- 🎓 Nach intensiven Trainingsphasen
- 📝 Nachdem du viele eigene Tricks erstellt hast
- 📱 Bevor du ein neues Gerät nutzt
- 🔄 Vor größeren Updates

#### 💾 Alte Daten-Funktionen (Legacy)

**Was wird gesichert?**
- ✅ Gelernte Tricks (IDs)
- ✅ Selbst erstellte Tricks
- ❌ KEINE Datenbank (kleinere Datei)

**Wann nutzen?**
- Du willst nur deinen Fortschritt sichern
- Du nutzt immer die neueste Online-Datenbank
- Kleinere Backup-Dateien gewünscht

**Verwendung:**
1. **Speichern:** Klicke "💾 Speichern" → Datei wird heruntergeladen
2. **Laden:** Klicke "📤 Laden" → Wähle die Datei

---

### 3. Offline-Modus

#### Lokale JSON bevorzugen

**Was macht diese Einstellung?**

```
☐ Lokale JSON bevorzugen (Offline-Modus)

Wenn AKTIVIERT:
├─ Beim App-Start: Datei-Auswahl-Dialog erscheint
├─ Du wählst eine lokale JSON-Datei
├─ Diese wird geladen (keine Online-Abfrage)
└─ Perfekt für komplette Offline-Nutzung

Wenn DEAKTIVIERT:
├─ Beim App-Start: Automatischer Online-Versuch
├─ Lädt neueste JSON von GitHub
└─ Falls offline: Nutzt Cache
```

**Wann aktivieren?**
- 🏕️ Unterwegs ohne Internet
- 💾 Du nutzt eine modifizierte lokale Datenbank
- 🔒 Du möchtest keine Online-Verbindung
- 🚀 Schnellerer Start (kein Online-Check)

**Anleitung:**
1. ☑️ Checkbox aktivieren
2. Einstellungen schließen
3. App neu laden (F5)
4. Datei-Dialog erscheint → Wähle deine JSON
5. ✅ App läuft komplett offline!

#### Backup-Dialog überspringen

```
☐ Backup-Dialog überspringen

Wenn AKTIVIERT:
└─ Backup-Dialog beim Start wird NICHT gezeigt
   ├─ Direkt zur Hauptansicht
   └─ Online-Datenbank wird automatisch geladen

Wenn DEAKTIVIERT:
└─ Beim Start: "Backup laden?" Dialog
   ├─ Du kannst ein Backup einspielen
   └─ Oder mit Online-Daten fortfahren
```

**Wann aktivieren?**
- Du nutzt keine Backups
- Du möchtest schneller starten
- Du arbeitest immer mit Online-Daten

**Wann deaktivieren?**
- Du wechselst häufig Geräte
- Du nutzt regelmäßig Backups
- Du möchtest beim Start gefragt werden

---

### 4. Sprachausgabe (Barrierefreiheit)

Die App bietet vollständige **Text-to-Speech** Unterstützung:

#### 🔊 Aktivierung & Einstellungen

```
┌─────────────────────────────────────┐
│ 🔊 Sprachausgabe (Barrierefreiheit)│
├─────────────────────────────────────┤
│ ☑ Sprachausgabe aktivieren         │
│                                     │
│ Geschwindigkeit: [●━━━━━] 1.0x    │
│                                     │
│ Lautstärke:     [●━━━━━] 100%     │
│                                     │
│ [🔊 Sprachausgabe testen]          │
└─────────────────────────────────────┘
```

**Parameter:**

| Einstellung | Bereich | Standard | Beschreibung |
|-------------|---------|----------|--------------|
| **Geschwindigkeit** | 0.5x - 2.0x | 1.0x | Wie schnell gesprochen wird |
| **Lautstärke** | 0% - 100% | 100% | Lautstärke der Sprachausgabe |

#### Wo wird vorgelesen?

1. **Trick-Karten:**
   - Klicke auf 🔊 Symbol in der Karte
   - Vorgelesen wird: Titel + Kategorie + Handzeichen + Ablauf

2. **Fortschrittsbalken:**
   - Klicke auf 🔊 neben dem Balken
   - Vorgelesen wird: "Du hast X von Y Tricks gelernt. Das sind Z Prozent."

3. **Buttons & Menüs:**
   - Automatische Vorlese-Buttons bei aktivierter Funktion

**Steuerung während der Wiedergabe:**
- **ESC-Taste:** Stoppt die Sprachausgabe sofort
- **Neue Wiedergabe:** Stoppt automatisch die alte

**💡 Tipps:**
- Geschwindigkeit 0.8x für gemütliches Lernen
- Geschwindigkeit 1.5x für schnelles Wiederholen
- Nutze die Testfunktion, um Einstellungen zu prüfen

---

### 5. App-Installation (PWA)

```
┌─────────────────────────────────────┐
│ 📱 App installieren                │
├─────────────────────────────────────┤
│ Installiere die App auf deinem     │
│ Gerät für bessere Performance      │
│ und Offline-Nutzung                │
│                                     │
│ [📱 Auf Startbildschirm installieren] │
│                                     │
│ Vorteile:                          │
│ • Schnellerer Start                │
│ • Offline-Zugriff                  │
│ • Kein Browser-UI                  │
│ • Wie eine native App              │
└─────────────────────────────────────┘
```

**Status-Anzeigen:**

- ✅ **App ist installiert** → Grüner Text, Installation erfolgreich
- ⚠️ **Installation nicht verfügbar** → Grauer Text, Browser unterstützt PWA nicht
- 📱 **Installieren** → Button ist aktiv, klicke zum Installieren

**Nach der Installation:**
- App erscheint auf dem Homescreen
- Öffnet sich in eigenem Fenster (ohne Browser-Leiste)
- Funktioniert auch komplett offline
- Erhält automatische Updates

---

### 6. Daten zurücksetzen

```
┌─────────────────────────────────────┐
│ 🗑️ Daten zurücksetzen              │
├─────────────────────────────────────┤
│ ⚠️ ACHTUNG: Löscht alle eigenen    │
│ Tricks und den Fortschritt!        │
│                                     │
│ [🗑️ Alles zurücksetzen]            │
└─────────────────────────────────────┘
```

**Was wird gelöscht?**
- ❌ Alle markierten Tricks (Fortschritt)
- ❌ Alle selbst erstellten Tricks
- ❌ Alle Einstellungen
- ✅ Datenbank bleibt erhalten (kann neu geladen werden)

**Sicherheitsabfrage:**
1. Klicke auf "Alles zurücksetzen"
2. Bestätigungsdialog erscheint:
   ```
   ⚠️ Wirklich ALLE Daten löschen?
   
   Dies kann nicht rückgängig gemacht werden!
   
   [Abbrechen]  [Ja, alles löschen]
   ```
3. Nur nach Bestätigung wird gelöscht

**💡 WICHTIG: Erstelle vorher ein Backup!**

---

## 🌐 Offline-Funktionalität

Die App ist als **Progressive Web App (PWA)** konzipiert und funktioniert vollständig offline:

### Wie funktioniert Offline-Modus?

#### 1️⃣ Service Worker (Automatisches Caching)

```
Beim ersten Besuch:
├─ Service Worker wird installiert
├─ Alle Dateien werden gecacht:
│  ├─ HTML (index.html)
│  ├─ JSON (Hundetricks.json)
│  ├─ Icons & Bilder
│  └─ Manifest
└─ ✅ App ist jetzt offline-fähig!

Bei folgenden Besuchen:
├─ Ohne Internet:
│  └─ Alle Daten aus Cache
├─ Mit Internet:
│  ├─ Check für Updates
│  └─ Neue Version? → Cache aktualisieren
└─ ✅ Immer die beste Version!
```

#### 2️⃣ Lokale Speicherung (LocalStorage)

Alle deine persönlichen Daten werden im **Browser** gespeichert:

```javascript
LocalStorage:
├─ dogTricksLearned  → [001, 042, 089, ...]  // Gelernte Trick-IDs
├─ customTricks      → [{id, titel, ...}, ...] // Eigene Tricks
├─ darkMode          → true/false              // Design-Präferenz
├─ ttsEnabled        → true/false              // Sprachausgabe
├─ ttsRate           → 1.0                     // TTS Geschwindigkeit
└─ ttsVolume         → 1.0                     // TTS Lautstärke
```

**Wichtig zu wissen:**
- ✅ Daten bleiben **dauerhaft** erhalten
- ✅ Funktioniert auf **allen modernen Browsern**
- ❌ Beim Löschen von Browser-Daten gehen Daten verloren
- 💡 **Lösung:** Regelmäßige Backups erstellen!

#### 3️⃣ Intelligente Lade-Strategie

```
App-Start mit Internet:
1. Versuche neueste JSON von GitHub zu laden
2. Falls erfolgreich: Nutze neue Daten
3. Falls fehlgeschlagen: Nutze Cache
4. Zeige Status in der UI

App-Start ohne Internet:
1. Lade aus Cache
2. Zeige "Offline-Modus" Indikator
3. Volle Funktionalität bleibt erhalten
```

### Offline-Szenarien & Verhalten

| Szenario | Verhalten |
|----------|-----------|
| **Erstbesuch ohne Internet** | ⚠️ Fehler - Mindestens 1x mit Internet nötig |
| **Wiederbesuch ohne Internet** | ✅ Volle Funktionalität aus Cache |
| **Update verfügbar (offline)** | ℹ️ Update beim nächsten Online-Besuch |
| **Lokale JSON geladen** | ✅ Komplett unabhängig von Netzwerk |

---

## 💾 Backup & Restore (Detailliert)

### Backup-Datei-Struktur

Ein vollständiges Backup ist eine JSON-Datei mit folgendem Aufbau:

```json
{
  "version": "2.0",
  "timestamp": "2024-12-28T10:30:00.000Z",
  "type": "full-backup",
  "data": {
    "learnedTricks": ["001", "015", "042", "089"],
    "customTricks": [
      {
        "id": "custom_001",
        "kategorie": "Anfänger",
        "titel": "Mein eigener Trick",
        "handzeichen": "...",
        "bewegungsablauf": "...",
        "endposition": "...",
        "trainingstipps": "..."
      }
    ],
    "database": [
      {
        "id": "001",
        "kategorie": "Anfänger",
        "titel": "Sitz",
        "..."
      }
    ],
    "settings": {
      "darkMode": true,
      "ttsEnabled": false,
      "ttsRate": 1.0,
      "ttsVolume": 1.0
    }
  }
}
```

### Geräteübergreifende Synchronisation

**Szenario: Du nutzt mehrere Geräte**

#### Methode 1: Manuelle Synchronisation

```
Gerät A (z.B. Handy):
1. Trainiere Tricks und markiere sie
2. Erstelle Backup: "💾 Vollständiges Backup"
3. Speichere Datei in Cloud (Dropbox, Google Drive, etc.)

Gerät B (z.B. Tablet):
1. Lade Backup-Datei aus Cloud herunter
2. Öffne App → Einstellungen → Backup laden
3. Wähle heruntergeladene Datei
4. ✅ Alle Daten sind synchronisiert!
```

#### Methode 2: URL-basierte Synchronisation

```
1. Lade dein Backup in ein GitHub Repository hoch
2. Notiere die RAW-URL zur Backup-Datei
3. Auf allen Geräten:
   ├─ Einstellungen → Von URL laden
   └─ Gib die URL ein
4. ✅ Alle Geräte nutzen dieselben Daten!
```

### Backup-Best-Practices

#### 📅 Regelmäßigkeit

- **Täglich:** Bei aktivem Training
- **Wöchentlich:** Bei normalem Gebrauch
- **Vor wichtigen Events:**
  - Gerätewechsel
  - Browser-Update
  - System-Reset

#### 💾 Speicherorte (Redundanz!)

- ✅ Lokale Kopie (Downloads-Ordner)
- ✅ Cloud-Speicher (Google Drive, Dropbox, iCloud)
- ✅ USB-Stick (für maximale Sicherheit)
- ✅ Email an dich selbst (einfacher Zugriff)

#### 📝 Dateinamen-Konvention

Die App erstellt automatisch strukturierte Namen:

```
hundetricks-full-backup-2024-12-28.json
│            │    │       │
│            │    │       └─ Datum (YYYY-MM-DD)
│            │    └───────── Backup-Typ
│            └────────────── App-Name
└─────────────────────────── Präfix
```

**💡 Tipp:** Benenne wichtige Backups um:
```
hundetricks-WICHTIG-vor-urlaub-2024-12-28.json
hundetricks-100tricks-gelernt-2024-11-15.json
```

### Backup-Fehlerbehandlung

#### Problem: Backup lässt sich nicht laden

**Mögliche Ursachen & Lösungen:**

1. **Falsche Datei ausgewählt**
   - ✅ Stelle sicher, dass es eine `.json` Datei ist
   - ✅ Öffne Datei in Texteditor → Sollte JSON sein

2. **Korrupte Datei**
   - ✅ Versuche ein älteres Backup
   - ✅ Validiere JSON online: [jsonlint.com](https://jsonlint.com/)

3. **Inkompatible Version**
   - ✅ Prüfe `"version"` in der Datei
   - ✅ Nutze neueste App-Version

4. **Browser-Sicherheit**
   - ✅ Erlaube Datei-Zugriff in Browser-Einstellungen
   - ✅ Versuche es in einem anderen Browser

#### Problem: Backup enthält nicht alle Daten

**Checkliste:**

```
☐ Ist es ein "full-backup" oder nur Legacy-Backup?
☐ Wurde das Backup NACH dem Training erstellt?
☐ Sind die Daten im Browser gespeichert gewesen?
☐ Wurde der Browser zwischenzeitlich zurückgesetzt?
```

**Lösung:**
- Nutze immer **"Vollständiges Backup"** für maximale Sicherheit
- Erstelle Test-Backup und lade es sofort wieder → Validierung

---

## 🛠️ Technische Details

### Architektur & Technologien

```
┌─────────────────────────────────────────┐
│          Browser (Client-Side)          │
├─────────────────────────────────────────┤
│                                         │
│  ┌────────────────────────────────┐    │
│  │    index.html (Single File)    │    │
│  │  ┌──────────────────────────┐  │    │
│  │  │   HTML Structure         │  │    │
│  │  ├──────────────────────────┤  │    │
│  │  │   CSS (Embedded)         │  │    │
│  │  │   • Dark Mode            │  │    │
│  │  │   • Responsive Layout    │  │    │
│  │  │   • Animations           │  │    │
│  │  ├──────────────────────────┤  │    │
│  │  │   JavaScript (Vanilla)   │  │    │
│  │  │   • DOM Manipulation     │  │    │
│  │  │   • Event Handling       │  │    │
│  │  │   • LocalStorage API     │  │    │
│  │  │   • Web Speech API       │  │    │
│  │  └──────────────────────────┘  │    │
│  └────────────────────────────────┘    │
│                                         │
│  ┌────────────────────────────────┐    │
│  │   Service Worker (Caching)     │    │
│  │   • Cache-First Strategy       │    │
│  │   • Offline Support            │    │
│  │   • Auto-Update                │    │
│  └────────────────────────────────┘    │
│                                         │
│  ┌────────────────────────────────┐    │
│  │   LocalStorage (Persistence)   │    │
│  │   • User Progress              │    │
│  │   • Custom Tricks              │    │
│  │   • Settings                   │    │
│  └────────────────────────────────┘    │
│                                         │
└─────────────────────────────────────────┘
           │                  ▲
           │ Fetch            │ Cache
           ▼                  │
┌─────────────────────────────────────────┐
│      GitHub Pages (Static Host)         │
├─────────────────────────────────────────┤
│  • Hundetricks.json (Database)          │
│  • Icons & Images                       │
│  • manifest.json (PWA Config)           │
└─────────────────────────────────────────┘
```

### Verwendete Web-APIs

| API | Verwendung |
|-----|------------|
| **LocalStorage** | Speicherung von Fortschritt, eigenen Tricks, Einstellungen |
| **Web Speech API** | Text-to-Speech Funktionalität |
| **Service Worker** | Offline-Fähigkeit, Caching |
| **Fetch API** | Laden der JSON-Datenbank |
| **File API** | Backup-Import/Export |
| **Manifest API** | PWA-Installation |

### Browser-Kompatibilität

| Browser | Version | Support | Anmerkungen |
|---------|---------|---------|-------------|
| **Chrome** | 90+ | ✅ Voll | Empfohlen |
| **Edge** | 90+ | ✅ Voll | Empfohlen |
| **Firefox** | 88+ | ✅ Voll | Empfohlen |
| **Safari** | 14+ | ✅ Voll | iOS-Installation anders |
| **Opera** | 76+ | ✅ Voll | - |
| **Samsung Internet** | 14+ | ✅ Voll | - |

**Minimale Anforderungen:**
- ES6 Support
- LocalStorage
- Service Worker
- Fetch API

### Performance-Optimierungen

1. **Lazy Loading:**
   - Trick-Details werden erst beim Aufklappen geladen
   - Bilder werden nur bei Bedarf nachgeladen

2. **Virtualisierung:**
   - Nur sichtbare Tricks werden gerendert
   - Scroll-Performance bleibt auch bei 1000+ Tricks optimal

3. **Caching-Strategie:**
   - Cache-First für statische Assets
   - Network-First für JSON (mit Fallback)

4. **Code-Splitting:**
   - Kritischer CSS inline
   - Nicht-kritischer Code asynchron

---

## ❓ Häufig gestellte Fragen

### Allgemeine Fragen

<details>
<summary><strong>Benötige ich einen Account?</strong></summary>

**Nein!** Die App funktioniert komplett ohne Account, Registrierung oder Login. Alle Daten bleiben lokal auf deinem Gerät.

</details>

<details>
<summary><strong>Ist die App kostenlos?</strong></summary>

**Ja!** Die App ist vollständig kostenlos und Open Source. Es gibt keine versteckten Kosten, Abos oder In-App-Käufe.

</details>

<details>
<summary><strong>Werden meine Daten hochgeladen?</strong></summary>

**Nein!** Alle Daten bleiben zu 100% auf deinem Gerät. Es werden keine Daten an Server gesendet (außer dem initialen Laden der Trick-Datenbank von GitHub).

</details>

<details>
<summary><strong>Funktioniert die App auf allen Geräten?</strong></summary>

**Ja!** Die App ist responsive und funktioniert auf:
- 📱 Smartphones (Android & iOS)
- 💻 Tablets
- 🖥️ Desktop-PCs
- 🌐 Allen modernen Browsern

</details>

### Nutzungsfragen

<details>
<summary><strong>Kann ich die App offline nutzen?</strong></summary>

**Ja!** Nach dem ersten Besuch (mit Internet) funktioniert die App vollständig offline. Alle Tricks sind verfügbar, Fortschritt wird gespeichert, und du kannst eigene Tricks erstellen.

</details>

<details>
<summary><strong>Wie viele Tricks kann ich als gelernt markieren?</strong></summary>

**Unbegrenzt!** Du kannst alle 120+ Tricks markieren und beliebig viele eigene Tricks erstellen. Es gibt keine Limits.

</details>

<details>
<summary><strong>Bleiben meine Markierungen erhalten, wenn ich den Browser schließe?</strong></summary>

**Ja!** Alle deine Markierungen, eigenen Tricks und Einstellungen werden permanent im Browser gespeichert.

**Ausnahmen:**
- Beim Löschen von Browser-Daten gehen sie verloren
- Beim Zurücksetzen der App (über Einstellungen)
- **Lösung:** Regelmäßige Backups erstellen!

</details>

<details>
<summary><strong>Kann ich eigene Tricks-Listen importieren?</strong></summary>

**Ja!** Du kannst eigene JSON-Dateien laden:
1. Erstelle eine JSON-Datei im korrekten Format (siehe [JSON-Struktur](#json-struktur))
2. Gehe zu Einstellungen → JSON laden
3. Wähle deine Datei oder gib eine URL ein

</details>

### Technische Fragen

<details>
<summary><strong>Warum erscheint beim Start ein Backup-Dialog?</strong></summary>

Das ist ein **Sicherheitsfeature**. Beim Start fragt die App, ob du ein Backup laden möchtest. So kannst du:
- Daten von einem anderen Gerät übernehmen
- Nach Browser-Reset wiederherstellen
- Verschiedene Profile nutzen

**Deaktivieren:** Einstellungen → ☑️ Backup-Dialog überspringen

</details>

<details>
<summary><strong>Die App lädt nicht / zeigt Fehler</strong></summary>

**Checkliste:**

1. **Internet-Verbindung prüfen** (beim ersten Mal nötig)
2. **Browser-Cache leeren:**
   - Chrome: Strg+Shift+Del
   - Wähle "Bilder und Dateien im Cache"
3. **Seite neu laden:** Strg+F5
4. **Anderen Browser testen**
5. **Service Worker neu installieren:**
   - Browser-DevTools → Application → Service Workers → Unregister
   - Seite neu laden

</details>

<details>
<summary><strong>Dark Mode funktioniert nicht</strong></summary>

**Lösungen:**

1. **Einstellung prüfen:** Navigation → 🌙 Symbol → sollte umschalten
2. **LocalStorage-Berechtigung:** Stelle sicher, dass Cookies/LocalStorage erlaubt sind
3. **Browser neu starten**
4. **Notfall-Reset:** Einstellungen → Daten zurücksetzen

</details>

<details>
<summary><strong>Sprachausgabe funktioniert nicht</strong></summary>

**Mögliche Ursachen:**

1. **Nicht aktiviert:** Einstellungen → ☑️ Sprachausgabe aktivieren
2. **Browser-Support:**
   - Chrome/Edge: ✅ Voll unterstützt
   - Firefox: ✅ Voll unterstützt
   - Safari: ⚠️ Limitiert (iOS)
3. **System-Lautstärke:** Prüfe Geräte-Lautstärke
4. **Sprache:** Stelle sicher, dass deutsche Stimmen installiert sind

**Test:** Einstellungen → 🔊 Sprachausgabe testen

</details>

<details>
<summary><strong>Backup lässt sich nicht laden</strong></summary>

**Häufige Fehler:**

1. **Falsche Datei:** Nur `.json` Dateien funktionieren
2. **Korrupte Datei:** Validiere auf [jsonlint.com](https://jsonlint.com/)
3. **Alte Version:** Nutze neueste App-Version
4. **Browser-Sicherheit:** Erlaube Datei-Zugriff

**Debug:**
1. Öffne Backup-Datei in Texteditor
2. Sollte mit `{` beginnen und mit `}` enden
3. `"version": "2.0"` sollte vorhanden sein

</details>

### Daten & Privatsphäre

<details>
<summary><strong>Wo werden meine Daten gespeichert?</strong></summary>

**Lokal in deinem Browser** im LocalStorage:

```
Browser → LocalStorage → hundetricks.github.io
├─ dogTricksLearned  (Gelernte Tricks)
├─ customTricks      (Eigene Tricks)
├─ darkMode          (Design)
└─ tts*              (Sprachausgabe-Einstellungen)
```

**Niemals:**
- ❌ Auf Servern
- ❌ In der Cloud
- ❌ Bei Dritten

</details>

<details>
<summary><strong>Kann ich meine Daten exportieren?</strong></summary>

**Ja!** Jederzeit über das Backup-System:

1. Einstellungen → 💾 Vollständiges Backup erstellen
2. Du erhältst eine JSON-Datei mit ALLEN deinen Daten
3. Diese Datei kannst du:
   - In der Cloud speichern
   - Per Email verschicken
   - Auf anderen Geräten nutzen
   - Für immer aufbewahren

</details>

<details>
<summary><strong>Werden Analytics/Tracking verwendet?</strong></summary>

**Nein!** Die App verwendet:
- ❌ Kein Google Analytics
- ❌ Keine Cookies (außer technisch notwendig)
- ❌ Kein Tracking
- ❌ Keine Werbung

**Einzige externe Verbindung:**
- GitHub Pages (zum Laden der Trick-Datenbank)
- Nur beim Start, nur wenn nötig

</details>

### Inhalts-Fragen

<details>
<summary><strong>Wie oft wird die Datenbank aktualisiert?</strong></summary>

**Unregelmäßig**, wenn:
- Neue Tricks hinzugefügt werden
- Fehler korrigiert werden
- Beschreibungen verbessert werden

**Du wirst informiert:**
- Beim App-Start, wenn Update verfügbar ist
- Durch Changelog in der App

**Manuell aktualisieren:**
1. Mit Internet-Verbindung öffnen
2. App lädt automatisch neueste Version
3. Service Worker aktualisiert Cache

</details>

<details>
<summary><strong>Kann ich fehlende Tricks hinzufügen (zur Datenbank)?</strong></summary>

**Ja!** Zwei Wege:

1. **Für dich selbst:**
   - Nutze "➕ Neuer Trick"
   - Bleibt lokal auf deinem Gerät

2. **Für alle (Contribution):**
   - Fork das GitHub-Repository
   - Bearbeite `Hundetricks.json`
   - Erstelle einen Pull Request
   - Nach Review: Für alle verfügbar!

</details>

<details>
<summary><strong>Ich habe einen Fehler in einem Trick gefunden</strong></summary>

**Bitte melde es!**

1. **GitHub Issue:** [Issues erstellen](https://github.com/Hundetricks/hundetricks.github.io/issues)
2. **Pull Request:** Korrektur direkt einreichen
3. **Beschreibe:**
   - Welcher Trick (ID/Name)
   - Was ist falsch
   - Was wäre richtig

</details>

---

## 👩‍💻 Für Entwickler

### Lokale Entwicklung

```bash
# Repository klonen
git clone https://github.com/Hundetricks/hundetricks.github.io.git
cd hundetricks.github.io

# Lokalen Server starten (Beispiele)
python -m http.server 8000
# oder
npx serve
# oder
php -S localhost:8000

# Browser öffnen
http://localhost:8000
```

### JSON-Struktur

Jeder Trick in `Hundetricks.json` folgt diesem Schema:

```json
{
  "id": "unique_id_001",
  "kategorie": "Anfänger|Fortgeschritten|Profi",
  "titel": "Name des Tricks",
  "handzeichen": "Ausführliche Beschreibung des Handzeichens für Details-Ansicht",
  "handzeichen_kurz": "Kurze Beschreibung für Karten-Vorschau",
  "bewegungsablauf": "Detaillierte Schritt-für-Schritt Anleitung",
  "endposition": "Beschreibung der finalen Position",
  "trainingstipps": "Hilfreiche Tipps für erfolgreiches Training",
  "schlagworte": ["optional", "keywords", "für", "suche"]
}
```

**Beispiel:**

```json
{
  "id": "001",
  "kategorie": "Anfänger",
  "titel": "Sitz",
  "handzeichen": "Flache Hand wird von unten nach oben über den Kopf des Hundes geführt, als würde man den Himmel berühren. Die Handfläche zeigt dabei nach oben.",
  "handzeichen_kurz": "Flache Hand von unten nach oben über Kopf führen",
  "bewegungsablauf": "1. Stehe gerade vor deinem Hund mit einem Leckerli in der Hand.\n2. Halte das Leckerli knapp über seine Nase.\n3. Bewege deine Hand langsam nach oben und leicht zurück über seinen Kopf.\n4. Dein Hund wird automatisch seinen Kopf nach oben und hinten bewegen und sich dabei setzen.\n5. Sobald sein Hinterteil den Boden berührt, sage 'Sitz!' und belohne sofort.",
  "endposition": "Der Hund sitzt aufrecht mit geradem Rücken. Die Hinterläufe sind angewinkelt, der Po berührt den Boden. Die Vorderläufe bleiben gestreckt. Der Kopf ist aufgerichtet und schaut zum Trainer.",
  "trainingstipps": "• Anfangs das Kommando erst geben, wenn der Hund bereits fast sitzt\n• Sehr kurze Trainingseinheiten (2-3 Minuten)\n• In reizarmer Umgebung beginnen\n• Sobald es zuverlässig klappt, das Handzeichen reduzieren\n• Zufällig belohnen, sobald der Trick sitzt",
  "schlagworte": ["sitzen", "grundkommando", "basis", "anfang"]
}
```

### Wichtige Dateien

| Datei | Zweck |
|-------|-------|
| `index.html` | Haupt-App (HTML, CSS, JS in einer Datei) |
| `Hundetricks.json` | Trick-Datenbank |
| `manifest.json` | PWA-Konfiguration |
| `service-worker.js` | Offline-Funktionalität |
| `icons/` | App-Icons verschiedener Größen |

### Custom CSS-Variablen

Das Design basiert auf CSS-Variablen für einfache Anpassung:

```css
:root {
  /* Farben */
  --primary-color: #4CAF50;
  --secondary-color: #2196F3;
  --success-color: #4CAF50;
  --warning-color: #FFC107;
  --danger-color: #F44336;
  
  /* Kategorien */
  --green-category: #4CAF50;
  --yellow-category: #FFC107;
  --red-category: #F44336;
  
  /* Abstände */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Schriftgrößen */
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;
}

[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --text-primary: #ffffff;
  --text-secondary: #b0b0b0;
}
```

### Build & Deploy

**GitHub Pages (Automatisch):**

```bash
# Einfach pushen
git add .
git commit -m "Update tricks database"
git push origin main

# GitHub Pages deployed automatisch
# Live in ~1 Minute auf: https://DEIN_USERNAME.github.io/
```

**Eigener Server:**

```bash
# Einfach alle Dateien hochladen
# Kein Build-Prozess nötig!
# Die App ist rein statisch
```

### Testing

```javascript
// Browser Console öffnen (F12)

// LocalStorage prüfen
localStorage.getItem('dogTricksLearned')
localStorage.getItem('customTricks')

// Service Worker Status
navigator.serviceWorker.getRegistrations()

// Cache prüfen
caches.keys().then(console.log)
```

### Contribution Guidelines

**Pull Requests willkommen!**

1. Fork das Repository
2. Erstelle einen Feature-Branch: `git checkout -b feature/neue-tricks`
3. Commit deine Änderungen: `git commit -m 'Add: 10 neue Agility-Tricks'`
4. Push zum Branch: `git push origin feature/neue-tricks`
5. Erstelle einen Pull Request

**Was wir suchen:**
- 🐕 Neue Tricks (mit vollständiger Beschreibung)
- 🐛 Bugfixes
- 🎨 Design-Verbesserungen
- 📚 Dokumentation
- 🌍 Übersetzungen (zukünftig)

---

## 📄 Lizenz

Dieses Projekt ist unter der **MIT-Lizenz** lizenziert.

```
MIT License

Copyright (c) 2024 Hundetricks

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

**Was bedeutet das?**
- ✅ Du darfst die App **kostenlos nutzen**
- ✅ Du darfst den Code **ansehen und ändern**
- ✅ Du darfst eigene Versionen **veröffentlichen**
- ✅ Du darfst die App **kommerziell nutzen**
- ⚠️ Ohne Gewährleistung (auf eigenes Risiko)

---

## 🙏 Credits & Danksagung

Entwickelt mit ❤️ für Hunde und ihre Menschen.

**Verwendete Technologien:**
- Vanilla JavaScript (ES6+)
- CSS3 mit Custom Properties
- Web APIs (LocalStorage, Service Worker, Web Speech)
- GitHub Pages (Hosting)

**Inspiration:**
- Moderne Hundetrainings-Methoden
- Progressive Web App Best Practices
- Material Design Principles

---

## 📞 Kontakt & Support

- 🐛 **Bugs melden:** [GitHub Issues](https://github.com/Hundetricks/hundetricks.github.io/issues)
- 💡 **Feature-Vorschläge:** [GitHub Discussions](https://github.com/Hundetricks/hundetricks.github.io/discussions)
- 📧 **Email:** [Deine Email hier]
- 🌐 **Website:** [https://hundetricks.github.io/](https://hundetricks.github.io/)

---

## 🎯 Roadmap

### Geplante Features

- [ ] 🌍 Multi-Language-Support (EN, FR, ES)
- [ ] 📊 Erweiterte Statistiken & Charts
- [ ] 🎥 Video-Tutorials für Tricks
- [ ] 🏆 Erfolge & Abzeichen-System
- [ ] 📱 Native Mobile Apps (iOS & Android)
- [ ] 🔄 Cloud-Sync (optional, opt-in)
- [ ] 👥 Community-Features
- [ ] 🎨 Individuelle Themes
- [ ] 📅 Trainingsplan-Generator
- [ ] 🔔 Erinnerungen für tägliches Training

**Dein Feature fehlt?** → [Vorschlag einreichen](https://github.com/Hundetricks/hundetricks.github.io/issues/new)

---

<div align="center">

**🐾 Viel Spaß beim Training! 🐾**

Wenn dir die App gefällt, gib uns einen ⭐ auf GitHub!

[![Star on GitHub](https://img.shields.io/github/stars/Hundetricks/hundetricks.github.io?style=social)](https://github.com/Hundetricks/hundetricks.github.io)

</div>
