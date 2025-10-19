# Geschäftsplan zur Gründung als selbstständiger IT-Dienstleister

Eine präsentationsartige Einzelseite des Geschäftsplans mit Foliendurchlauf, Umsatzdiagramm (Chart.js) und komfortablem PDF-Download. Das Projekt ist für lokalen Betrieb und die Veröffentlichung als statische Seite ausgelegt.

## Beschreibung des Projekts
- Präsentationsseite mit 12 Folien (Slides) im klaren Layout.
- Navigation über Buttons („← Zurück“, „Weiter →“) und über die Pfeiltasten der Tastatur.
- Umsatzwachstumsdiagramm auf der 9. Folie (Chart.js 3.9.1, via CDN).
- Button „📥 PDF herunterladen“: lädt zunächst die vorbereitete PDF aus `assets`, fällt bei Nichtverfügbarkeit auf die Generierung per `html2pdf` (CDN) zurück.
- Modulare Logik in `script.js` ohne Inline-Event-Handler im HTML.

## Ziele des Projekts
- Eine leicht lesbare, druckfreundliche Präsentation des Geschäftsplans bereitstellen.
- Zuverlässigen PDF-Download sicherstellen (fertige Datei aus `assets`) sowie einen robusten Fallback über `html2pdf` anbieten.
- Einfaches Deployment ermöglichen: jeder statische Server genügt.
- Grundlegende Zugänglichkeit und korrekte Tastaturnavigation unterstützen.

## Anleitung zum Starten

### Systemanforderungen
- Betriebssystem: Windows 10/11, macOS oder Linux.
- Browser: aktueller Chrome, Edge, Firefox oder Safari.
- Für den lokalen Server: Node.js 18+ (oder ein beliebiger statischer Server/VS Code „Live Server“).
- Internetzugang (für die Bibliotheken über CDN: Chart.js und html2pdf). Ist das Internet nicht verfügbar, kann die vorbereitete PDF aus `assets` trotzdem heruntergeladen werden.

### Installation und Einrichtung
1. Repository klonen:
   ```bash
   git clone https://github.com/Melik1986/Gesch-ftsplan-zur-Gr-ndung-als-selbstst-ndiger-IT-Dienstleister.git
   cd Gesch-ftsplan-zur-Gr-ndung-als-selbstst-ndiger-IT-Dienstleister
   ```
2. (Optional) Einfachen statischen Server installieren oder per `npx` verwenden:
   - Global:
     ```bash
     npm i -g http-server
     ```
   - Ohne Installation:
     ```bash
     npx --yes http-server -p 5500
     ```
3. Server im Projektstamm starten:
   ```bash
   http-server -p 5500
   ```
   Alternative: VS Code „Live Server“ nutzen und `index.html` starten.

### Startbefehle
- Serverstart über `npx`:
  ```bash
  npx --yes http-server -p 5500
  ```
- Seite im Browser öffnen:
  ```
  http://127.0.0.1:5500/index.html
  ```

## Nutzung
- Folienwechsel: Buttons „← Zurück“ und „Weiter →“ oder die Pfeiltasten.
- Button „📥 PDF herunterladen“:
  - Lädt die vorbereitete PDF aus `assets/Gesch_ftsplan_zur_Gr_ndung_als_selbstst_ndiger_IT-Dienstleister.pdf`.
  - Ist die Datei nicht erreichbar, wird die PDF aus der aktuellen Seite generiert (Internetverbindung zum CDN `html2pdf` erforderlich).

## Projektstruktur
```
.
├── assets/
│   └── Gesch_ftsplan_zur_Gr_ndung_als_selbstst_ndiger_IT-Dienstleister.pdf
├── index.html
├── script.js
├── styles.css
└── .vscode/
    └── settings.json
```

## Technische Details
- `index.html`: bindet Styles, die CDNs für Chart.js und html2pdf sowie das modulare Skript `script.js` ein (`<script type="module" src="script.js"></script>`).
- `script.js`:
  - Hängt Klick- und Tastatur-Handler an, steuert die Folien und den Zustand der Buttons.
  - Initialisiert das Diagramm nur beim Wechsel auf die entsprechende Folie (Leistungsoptimierung).
  - Implementiert den PDF-Download via `fetch` + Blob; bei Fehlern Fallback auf `html2pdf`.
- `styles.css`: Gestaltung der Abschnitte, Buttons und responsive Styles.

## Hinweise
- Beim direkten Öffnen per `file://` können modulare Skripte und CDN-Ressourcen in manchen Browsern eingeschränkt funktionieren. Der Start über einen lokalen Server wird empfohlen.
- Für die PDF-Erzeugung aus der Seite ist Internetzugang zum CDN `html2pdf` erforderlich; die vorbereitete PDF in `assets` ist offline verfügbar.
- Falls die Meldung „downloadPresentation ist nicht definiert“ erscheint, stellen Sie sicher, dass im HTML keine Inline-Handler `onclick` vorhanden sind und die Seite mit den aktuellen Änderungen geladen wurde (harte Aktualisierung: `Strg+F5`).