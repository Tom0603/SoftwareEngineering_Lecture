# Campus-App

Diese Webanwendung ermöglicht es, gefundene herrenlose Gegenstände zu melden. Nutzer, die einen Gegenstand eintragen möchten, laden ein Foto hoch, fügen einen Titel und eine Beschreibung hinzu und geben den Fundort an. Alle Anzeigen sind öffentlich einsehbar, sodass andere ihre verlorenen Gegenstände leichter wiederfinden können. Sobald ein Gegenstand abgeholt wurde, kann dies vermerkt werden und die Anzeige wird entfernt. Unabhängig davon bleibt jede Anzeige maximal zwei Wochen online.

## Spezifikation

<details>
<summary>Funktionale Anforderungen</summary>

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
<summary>Nicht-Funktionale Anforderungen</summary>

| Titel             | Beschreibung                                                                                  | Relevanz        |
|-------------------|------------------------------------------------------------------------------------------------|-----------------|
| Antwortzeit / Suche | Seiten sollen innerhalb von 2 Sekunden laden, Suchergebnisse in weniger als 1 Sekunde erscheinen. | 🔴 sehr wichtig |
| Betriebszeit      | Die Anwendung soll eine Verfügbarkeit von mindestens 95 % pro Monat haben.                     | 🔴 sehr wichtig |
| Einfache Bedienung| Die Nutzeroberfläche soll klar, selbsterklärend und auch ohne technisches Vorwissen nutzbar sein.| 🟠 wichtig      |
| Modularer Aufbau  | Das System soll modular entwickelt sein, sodass neue Funktionen einfach ergänzt werden können. | 🟠 wichtig        |
| Fehlerbehandlung  | Fehlerhafte Eingaben oder Systemfehler sollen verständlich abgefangen und dem Nutzer angezeigt werden.| 🔴 sehr wichtig |
| Barrierefreiheit  | Die Anwendung ist auch für Nutzer mit Einschränkungen (Screenreader, Kontraste) zugänglich.      | 🟠 wichtig      |

</details>


<details>
<summary>MVP</summary>
<br>
Das Minimum Viable Product (MVP) der Fundgegenstände-Webanwendung konzentriert sich auf die grundlegenden Funktionen, die den Kernnutzen für die Nutzerinnen und Nutzer sicherstellen. Im Mittelpunkt steht die Möglichkeit, gefundene Gegenstände schnell und einfach online zu melden. Dazu können Nutzer ein Bild hochladen sowie Titel, Beschreibung und Fundort angeben. Alle Anzeigen sind öffentlich einsehbar und können über eine Suchfunktion nach Kategorien oder Freitext durchsucht werden. Wurde ein Gegenstand abgeholt, kann dies in der Anzeige vermerkt werden, sodass die Anzeige verschwindet. Zusätzlich werden alle Anzeigen nach spätestens zwei Wochen automatisch gelöscht, um die Übersichtlichkeit zu gewährleisten.

Die Anwendung soll einfach zu bedienen und auch ohne Registrierung nutzbar sein. Eine klare, responsive Oberfläche sorgt dafür, dass die Plattform sowohl auf dem Computer als auch auf mobilen Endgeräten problemlos funktioniert. Die Suche muss schnell Ergebnisse liefern, sodass Nutzer innerhalb weniger Sekunden relevante Anzeigen finden können.

Auf diese Weise deckt das MVP die wesentlichen Schritte ab: Fund melden – Fund suchen – Fund abholen. Erweiterte Funktionen wie Nutzer-Accounts, Benachrichtigungen, Duplikatsprüfungen oder Standortkarten sind in späteren Ausbaustufen vorgesehen, gehören aber nicht zum ersten lauffähigen Produkt.
<br>

</details>


## Personas

<details>
<summary>Miriam (19, Erstsemester Biologie)</summary>

**Ziel:** Übersichtliche Orientierung: Wo kann sie nach ihrem verlorenen Schlüssel suchen? Wer ist Ansprechpartner?  
**Frust:** Sie ist neu am Campus und weiß nicht, wo Fundsachen gemeldet oder abgeholt werden können.

</details>


<details>
<summary>Jonas (24, Master Informatik)</summary>

**Ziel:** Er will gefundene USB-Sticks oder Kopfhörer einfach eintragen, damit der Besitzer sie wiederbekommt.  
**Frust:** Es gibt kein zentrales System, und Fundstücke bleiben oft wochenlang liegen oder verschwinden.

</details>


<details>
<summary>Lisa (21, BWL-Studentin)</summary>

**Ziel:** Sie möchte schnell und unkompliziert einen verlorenen Gegenstand melden, den sie in der Mensa vergessen hat.  
**Frust:** Bislang muss sie mehrere Stellen abklappern und weiß nie, ob ihr Fund überhaupt gemeldet wurde.

</details>


<details>
<summary>Max (27, Chemiestudent)</summary>

**Ziel:** Er möchte regelmäßig prüfen, ob sein verlorener Taschenrechner gemeldet wurde.  
**Frust:** Die Informationen sind verstreut und er muss sich auf Aushänge verlassen.

</details>


<details>
<summary>Katrin (22, Pädagogikstudentin)</summary>

**Ziel:** Einen anonymen Weg finden, um einen gefundenen Gegenstand zu melden, ohne persönlich ins Sekretariat zu gehen.  
**Frust:** Sie fühlt sich unsicher, wenn sie direkt mit Fremden Kontakt aufnehmen muss.

</details>


## Stakeholder

<details>
<summary>Studierende</summary>

- Erstsemester → neu auf dem Campus, unsicher, wo Fundsachen gemeldet oder abgeholt werden können.  
- Höhere Semester → kennen sich besser aus, möchten schnell melden oder finden.  
- Dual Studierende allgemein → sind nicht immer am Campus, möchten ggf. auch aus der Ferne prüfen, ob ihr Fund gemeldet wurde.  

</details>


<details>
<summary>Lehrende & Wissenschaftliche Mitarbeiter</summary>

- Professor:innen / Dozent:innen → verlieren oder finden Gegenstände in Vorlesungen.  

</details>


<details>
<summary>Verwaltungs- und Servicepersonal</summary>

- Sekretariat → bisher Anlaufstelle für Fundsachen.  
- Hausmeister / Facility Management → finden regelmäßig Dinge in Hörsälen, Fluren, Toiletten.   
- Mensa- und Cafeteria-Personal → Fundorte wie Geschirr, Kleidung, Taschen.  

</details>


<details>
<summary>Technisches Personal</summary>

- IT-Support → betreuen die Webanwendung, kümmern sich um Login, Accounts, Datenhaltung.  
- Datenschutzbeauftragte → achten auf DSGVO und sichere Verarbeitung personenbezogener Daten.  

</details>


<details>
<summary>Verwaltung & Leitung</summary>

- Hochschulleitung → möchte geregelte Prozesse und gutes Image.  
- Verwaltungsleitung / Facility Management → hat organisatorisches Interesse an Ordnung und Reduktion von Aufwand.  

</details>


<details>
<summary>Externe Stakeholder</summary>

- Besucher:innen (z. B. Eltern, Gäste bei Veranstaltungen, Firmenvertreter in Projekten) → können ebenfalls Dinge verlieren oder finden.  
- Reinigungspersonal (Fremdfirmen) → finden sehr häufig Gegenstände außerhalb der regulären Zeiten.  

</details>


