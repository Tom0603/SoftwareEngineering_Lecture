# Campus-App

Diese Webanwendung ermöglicht es, gefundene herrenlose Gegenstände zu melden. Nutzer, die einen Gegenstand eintragen möchten, laden ein Foto hoch, fügen einen Titel und eine Beschreibung hinzu und geben den Fundort an. Alle Anzeigen sind öffentlich einsehbar, sodass andere ihre verlorenen Gegenstände leichter wiederfinden können. Sobald ein Gegenstand abgeholt wurde, kann dies vermerkt werden und die Anzeige wird entfernt. Unabhängig davon bleibt jede Anzeige maximal zwei Wochen online.

## Spezifikation

<details>
<summary><strong>Funktionale Anforderungen</strong></summary>

| Titel                     | Beschreibung                                                                                                 | Relevanz        |
|---------------------------|-------------------------------------------------------------------------------------------------------------|-----------------|
| Anzeige schalten          | Nutzer können eine Anzeige mit Bild, Titel, Beschreibung und Fundort online stellen.                        | 🔴 sehr wichtig |
| Manuelle Duplikatsprüfung | Beim Inserieren werden dem Nutzer bereits gemeldete Gegenstände am gleichen Fundort angezeigt. Er entscheidet dann, ob er die Anzeige erstellt. | 🟡 mittel |
| Suche nach Kategorie/Text | Nutzer können Anzeigen nach Kategorien (z. B. Kleidung, Elektronik) oder per Freitext durchsuchen.           | 🟡 mittel       |
| Gegenstand abholen        | Nutzer können eine Anzeige als „abgeholt“ markieren.                                                        | 🔴 sehr wichtig |
| Suche inserieren          | Nutzer können Gesuche aufgeben, um auf verlorene Gegenstände aufmerksam zu machen.                          | 🟠 wichtig      |
| Login / Registrieren      | Nutzerkonten ermöglichen personalisierte Anzeigen.                                                          | 🟡 mittel       |
| Logging                   | Es wird protokolliert, wer einen Gegenstand als abgeholt markiert hat, um Missbrauch nachverfolgen zu können.| 🟢 gering       |
| Kategorien / Tags         | Anzeigen können mit Kategorien (z. B. Kleidung, Elektronik) oder Schlagwörtern versehen werden.              | 🟡 mittel       |
| Benachrichtigungen        | Nutzer erhalten eine Nachricht (E-Mail/App), wenn ein möglicher Treffer zu ihrem Gesuch oder Fundort erscheint.| 🟢 gering   |

</details>

<details>
<summary><strong>Nicht-Funktionale Anforderungen</strong></summary>

| Titel             | Beschreibung                                                                                  | Relevanz        |
|-------------------|------------------------------------------------------------------------------------------------|-----------------|
| Antwortzeit / Suche | Seiten sollen innerhalb von 2 Sekunden laden, Suchergebnisse in weniger als 1 Sekunde erscheinen. | 🔴 sehr wichtig |
| Betriebszeit      | Die Anwendung soll eine Verfügbarkeit von mindestens 95 % pro Monat haben.                     | 🔴 sehr wichtig |
| Einfache Bedienung| Die Nutzeroberfläche soll klar, selbsterklärend und auch ohne technisches Vorwissen nutzbar sein.| 🟠 wichtig      |
| Modularer Aufbau  | Das System soll modular entwickelt sein, sodass neue Funktionen einfach ergänzt werden können. | 🟡 mittel       |
| Fehlerbehandlung  | Fehlerhafte Eingaben oder Systemfehler sollen verständlich abgefangen und dem Nutzer angezeigt werden.| 🔴 sehr wichtig |
| Barrierefreiheit  | Die Anwendung ist auch für Nutzer mit Einschränkungen (Screenreader, Kontraste) zugänglich.      | 🟠 wichtig      |

</details>


<details>
<summary><strong>MVP</strong></summary>
<br>
Das Minimum Viable Product (MVP) der Fundgegenstände-Webanwendung konzentriert sich auf die grundlegenden Funktionen, die den Kernnutzen für die Nutzerinnen und Nutzer sicherstellen. Im Mittelpunkt steht die Möglichkeit, gefundene Gegenstände schnell und einfach online zu melden. Dazu können Nutzer ein Bild hochladen sowie Titel, Beschreibung und Fundort angeben. Alle Anzeigen sind öffentlich einsehbar und können über eine Suchfunktion nach Kategorien oder Freitext durchsucht werden. Wurde ein Gegenstand abgeholt, kann dies in der Anzeige vermerkt werden, sodass die Anzeige verschwindet. Zusätzlich werden alle Anzeigen nach spätestens zwei Wochen automatisch gelöscht, um die Übersichtlichkeit zu gewährleisten.

Die Anwendung soll einfach zu bedienen und auch ohne Registrierung nutzbar sein. Eine klare, responsive Oberfläche sorgt dafür, dass die Plattform sowohl auf dem Computer als auch auf mobilen Endgeräten problemlos funktioniert. Die Suche muss schnell Ergebnisse liefern, sodass Nutzer innerhalb weniger Sekunden relevante Anzeigen finden können.

Auf diese Weise deckt das MVP die wesentlichen Schritte ab: Fund melden – Fund suchen – Fund abholen. Erweiterte Funktionen wie Nutzer-Accounts, Benachrichtigungen, Duplikatsprüfungen oder Standortkarten sind in späteren Ausbaustufen vorgesehen, gehören aber nicht zum ersten lauffähigen Produkt.
<br>