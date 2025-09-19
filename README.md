# Campus-App

In dieser ReadMe sollen die Kernfunktionen der Campus-App erläutert werden und die diesen zugrundeliegenden Personas kurz eingeführt werden.

## Kernfunktionen

1. **Raum-Suche in Echtzeit**  
   Die App zeigt jederzeit an, welche Räume aktuell frei oder belegt sind.  
   Nutzer:innen können über Filter gezielt nach Räumen in der Nähe, mit bestimmter Größe oder Ausstattung suchen (z. B. Beamer, Steckdosen, Whiteboard).  
   Für spontane Fälle gibt es einen „Jetzt frei“-Button, der sofort den nächsten verfügbaren Raum vorschlägt.  

2. **Einfache Raum-Reservierung**  
   Räume lassen sich direkt über die App buchen – ohne lästige Umwege über das Sekretariat oder unübersichtliche Aushänge.  
   Reservierungen können einmalig oder wiederkehrend (z. B. jede Woche zur gleichen Zeit) angelegt werden.  
   Alle Buchungen sind verbindlich und transparent, sodass klar erkennbar ist, wer den Raum reserviert hat.  

3. **Ausstattungs-Check**  
   Für jeden Raum sind Informationen zur Ausstattung und deren Zustand verfügbar.  
   Nutzer:innen können selbst Feedback geben, wenn etwas nicht funktioniert (z. B. „Beamer defekt“).  
   So ist vorab klar, ob ein Raum für spezielle Bedürfnisse geeignet ist – etwa für Gruppenarbeit, Modellbau oder stilles Lernen.  

4. **Transparenz & Fairness bei Buchungen**  
   Die App zeigt nicht nur, welche Räume reserviert sind, sondern auch, ob diese Reservierungen aktiv genutzt werden.  
   So können blockierte, aber leere Räume identifiziert werden.  
   Klare Regeln verhindern, dass Buchungen willkürlich überschrieben oder gelöscht werden.  

5. **Gruppen- & Kalenderintegration**  
   Gruppen können direkt über die App gemeinsame Termine und Räume finden.  
   Reservierungen lassen sich nahtlos mit Kalender- oder Mail-Programmen verknüpfen, sodass Einladungen an Teilnehmer:innen automatisch verschickt werden.  
   Damit entfällt das doppelte Eintragen von Terminen und Räumen.  


## Personas

<details>
<summary>Alle Personas anzeigen</summary>

### 1. Lisa (21, BWL-Studentin)
**Ziel:** Sie will spontan freie Räume finden, um zwischen Vorlesungen effizient zu lernen.  
**Frust:** Aktuell läuft sie oft durchs ganze Gebäude, nur um festzustellen, dass alles besetzt ist. Die Infos im Aushang sind nie aktuell.

---

### 2. Jonas (24, Master Informatik)
**Ziel:** Mit seiner Projektgruppe wöchentliche Slots für Gruppenarbeiten festlegen.  
**Frust:** Die Abstimmung über WhatsApp dauert ewig, weil niemand weiß, wann Räume überhaupt frei sind. Buchungen im Sekretariat sind unübersichtlich.

---

### 3. Miriam (19, Erstsemester Biologie)
**Ziel:** Übersichtliche Orientierung: Wo sind Räume? Welche Ausstattung (Beamer, Steckdosen, Whiteboard) gibt es?  
**Frust:** Sie ist neu am Campus, kennt die Gebäude kaum, steht oft im falschen Raum oder ohne Steckdose für ihren Laptop.

---

### 4. Ahmed (27, Promotionsstudent Chemie)
**Ziel:** Regelmäßig denselben Seminarraum buchen, um in Ruhe zu schreiben.  
**Frust:** Räume sind ständig durch kurzfristige Reservierungen blockiert, ohne dass er nachvollziehen kann, ob sie wirklich genutzt werden.

---

### 5. Katrin (22, Pädagogikstudentin)
**Ziel:** Einen ruhigen Lernraum finden, in dem man konzentriert alleine arbeiten kann.  
**Frust:** Viele Räume sind offiziell „frei“, aber von Gruppen belegt, die laut diskutieren. Keine klare Kennzeichnung im System.

---

### 6. Felix (20, Maschinenbau)
**Ziel:** Kurzfristig Räume buchen, wenn er mit Kommilitonen eine Matheaufgabe durchrechnen will.  
**Frust:** Die App (oder das aktuelle System) braucht zu viele Klicks, er möchte eigentlich „jetzt freien Raum in meiner Nähe“.

---

### 7. Sofia (23, Architektur)
**Ziel:** Räume mit spezieller Ausstattung (Plotter, große Tische) im Voraus blocken, damit sie ihre Modelle vorbereiten kann.  
**Frust:** Niemand weiß, ob die Ausstattung in einem Raum wirklich funktioniert. Sie stand schon mit 3 Modellen da und der Beamer ging nicht.

---

### 8. David (21, WiWi)
**Ziel:** Übersicht über die Auslastung der Bibliothek und Lernräume, um Stoßzeiten zu meiden.  
**Frust:** Er geht oft umsonst hin, weil es überfüllt ist, obwohl er vorher nicht einschätzen kann, wie die Auslastung gerade ist.

---

### 9. Nina (25, Soziologie)
**Ziel:** Will ihre Lernzeiten strukturieren und sich Räume verbindlich für die Prüfungsphase reservieren.  
**Frust:** Dauernd werden ihre Reservierungen überschrieben oder gelöscht, weil das Sekretariat für „wichtige Veranstaltungen“ Vorrang gibt.

---

### 10. Tobias (23, Sportwissenschaften)
**Ziel:** Gruppenräume für Tutorien mit Erstsemestern unkompliziert buchen, inkl. Einladung an Teilnehmer.  
**Frust:** Es gibt keine Schnittstelle zwischen Raumreservierung und Einladungssystem (z. B. Mail/Kalender). Er muss alles doppelt eintragen.

</details>


## User Stories

<details>
<summary>Alle User Stories anzeigen</summary>

1. Lisa, 21, BWL-Studentin, möchte zwischen ihren Vorlesungen spontan einen ruhigen Raum zum Lernen finden. Statt wie bisher durchs Gebäude zu laufen und überall vergeblich nach freien Plätzen zu suchen, wünscht sie sich in der Campus-App einen einfachen „Jetzt frei“-Button. Mit einem Klick soll ihr sofort ein verfügbarer Raum in der Nähe angezeigt werden – inklusive Filtermöglichkeiten nach Größe oder Ausstattung. So kann sie ihre Pausen effizienter nutzen und ohne Umwege direkt anfangen zu lernen.

2. Jonas, 24, Masterstudent in Informatik, arbeitet mit seiner Projektgruppe regelmäßig zusammen. Die Terminfindung über WhatsApp zieht sich bisher endlos hin, weil niemand weiß, wann Räume frei sind. Mit der Campus-App will er wiederkehrende Reservierungen anlegen, zum Beispiel jeden Dienstag von 16 bis 18 Uhr. Die Gruppe erhält automatisch eine Einladung in ihre Kalender, und für alle ist jederzeit klar ersichtlich, wer den Raum gebucht hat. Damit spart sich die Gruppe Abstimmungschaos und kann sich auf die eigentliche Projektarbeit konzentrieren.

3. Miriam, 19, Biologie-Erstsemester, ist neu am Campus und hat noch keine Orientierung in den Gebäuden. Sie landet oft im falschen Raum oder ohne Steckdose für ihren Laptop. Mit der Campus-App soll sie eine übersichtliche Anzeige bekommen, in der alle Räume mit ihrer Lage und Ausstattung dargestellt sind. So sieht sie vorab, ob ein Raum über Steckdosen, Beamer oder Whiteboard verfügt, und ob diese auch tatsächlich funktionieren. Eine Kartenansicht erleichtert zusätzlich die Orientierung, sodass sie sicher und vorbereitet in die richtige Umgebung findet.

</details>
