# Fundus – Campus App

Welcome to Fundus – your simple solution to quickly reconnect lost and found items on campus!
Fundus helps students and staff report found items or search for lost belongings online – all without the need to register.

If you find something, you can upload a picture and briefly describe what you found and where. All reports are visible to everyone and can be searched at any time. A clear search function allows you to quickly discover relevant entries – either by category or keyword.

Once an item has been picked up, the report can be marked accordingly, and it will automatically disappear from the overview. Additionally, entries older than two weeks are deleted to keep the platform clean and up-to-date.
Thanks to a clean, responsive interface, Fundus works smoothly on both laptops and smartphones – ideal whether you're on the go or directly on campus.

Fundus makes it easy: Found – searched – reunited.

## Specification

<details>
<summary>Functional Requirements</summary>

| Title                   | Description                                                                                                      | Importance   |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------ |
| Create Listing          | Users can create a listing with an image, title, description, and location.                                      | 🔴 Critical  |
| Manual Duplicate Check  | When creating a listing, users are shown similar items from the same location and can decide whether to proceed. | 🟡 Medium    |
| Search by Category/Text | Users can search listings by category (e.g., clothing, electronics) or via free text.                            | 🟡 Medium    |
| Mark Item as Retrieved  | Users can mark an item as “retrieved.”                                                                           | 🔴 Critical  |
| Create Search Request   | Users can post a request for items they are actively searching for.                                              | 🟠 Important |
| Login / Registration    | User accounts allow personalized listings.                                                                       | 🟡 Medium    |
| Logging                 | System logs who marked an item as retrieved to prevent misuse.                                                   | 🟢 Low       |
| Categories / Tags       | Listings can be assigned categories or tags.                                                                     | 🟡 Medium    |
| Notifications           | Users receive notifications (email/app) when a potential match appears.                                          | 🟢 Low       |


</details>

<details>
<summary>Non-Functional Requirements</summary>

| Title                  | Description                                                                                         | Importance   |
| ---------------------- | --------------------------------------------------------------------------------------------------- | ------------ |
| Response Time / Search | Pages should load within 2 seconds, search results within 1 second.                                 | 🔴 Critical  |
| Availability           | The application should have at least 95% uptime per month.                                          | 🔴 Critical  |
| Ease of Use            | The interface should be clear and intuitive, even for non-technical users.                          | 🟠 Important |
| Modular Architecture   | The system should be modular to allow easy feature expansion.                                       | 🟠 Important |
| Error Handling         | Input and system errors should be communicated clearly to users.                                    | 🔴 Critical  |
| Accessibility          | The application should be usable with assistive technologies (screen readers, contrast mode, etc.). | 🟠 Important |


</details>


<details>
<summary>MVP</summary>
<br>
The Minimum Viable Product (MVP) focuses on core functionality that ensures direct value for users. The main feature is the ability to quickly and easily report found items online. Users can upload an image and provide a title, description, and location. All listings are publicly visible and searchable via category or keyword. If an item is retrieved, the listing can be marked accordingly so it disappears. To maintain clarity, all listings are automatically removed after two weeks.

The application is designed for simplicity and can be used without registration. A clean, responsive interface ensures smooth usability on both desktops and mobile devices. The search function must return results fast, enabling users to find relevant listings within seconds.

Thus, the MVP covers the essential flow: Report – Search – Retrieve. Additional features such as user accounts, notifications, duplicate detection, or location maps may be added in later development stages.
<br>

</details>


## Personas

<details> <summary>Miriam (19, First-Year Biology)</summary>

**Goal**: Quickly understand where she can search for her missing key and who to contact. <br>
**Frustration**: As a newcomer, she has no idea where lost items are handled on campus.

</details> <details> <summary>Jonas (24, Master’s in Computer Science)</summary>

**Goal**: Report found USB sticks or headphones so they can be returned to the owner. <br>
**Frustration**: There is no central system; items often disappear or remain unclaimed for weeks.

</details> <details> <summary>Lisa (21, Business Administration Student)</summary>

**Goal**: Report a lost item she left at the cafeteria easily. <br>
**Frustration**: She currently has to check multiple places and never knows whether anyone found it.

</details> <details> <summary>Max (27, Chemistry Student)</summary>

**Goal**: Regularly check whether his missing calculator has been found. <br>
**Frustration**: Information is scattered, relying on posters and notice boards.

</details> <details> <summary>Katrin (22, Education Studies)</summary>

**Goal**: Report a found item anonymously without having to interact directly. <br>
**Frustration**: She feels uncomfortable approaching strangers in person.
</details>


## Stakeholder

<details>
<summary>Students</summary>

- First-years → don’t know where to look for lost & found services.
- Senior students → want fast reporting and search.
- Dual students → are not always on campus and want remote access.  

</details>


<details>
<summary>Faculty & Academic Staff</summary>

- Professors and instructors → lose and find items in lecture halls. 

</details>


<details>
<summary>Verwaltungs- und Servicepersonal</summary>

- Sekretariat → bisher Anlaufstelle für Fundsachen.  
- Hausmeister / Facility Management → finden regelmäßig Dinge in Hörsälen, Fluren, Toiletten.   
- Mensa- und Cafeteria-Personal → Fundorte wie Geschirr, Kleidung, Taschen.  

</details> 

<details> 
<summary>Administrative & Service Staff</summary>

- Front desk staff → previously the main lost & found contact point.
- Facilities staff → frequently find items around campus.
- Cafeteria staff → common location for lost water bottles, clothing, etc.

</details> 

<details> 
<summary>Technical Personnel</summary>

- IT Support → maintains the application and data security.
- Data Protection Officers → ensure compliance with privacy regulations.

</details> 

<details> 
<summary>Administration & Leadership</summary>

- University leadership → wants organized processes and a positive campus experience.
- Facilities management → benefits from reduced workload and clearer workflows.

</details> 

<details> 
<summary>External Stakeholders</summary>

- Visitors (guests, families, corporate partners) → may also lose or find items.
- Cleaning staff (contracted companies) → often find items outside office hours.

</details>

## Project ReadME structure

This repository is divided into Frontend and Backend components.
Each part of the project has its own README file, which explains its setup and architecture in detail:

- Backend README (./backend/README.md):
Contains information about the backend architecture and folder structure, how to set up the environment (including .env configuration and virtual environment), how to start the development server, available scripts and commands, API endpoints with example requests/responses, libraries used, testing instructions, deployment notes, and troubleshooting tips.

- Frontend README (./frontend/README.md):
Describes the tech stack and project structure (pages/routes, components, state handling), setup and development server instructions, environment variables, available npm/yarn scripts, build and preview steps, code style and formatting rules, testing instructions (if applicable), deployment notes, and known issues.

Before working on any part of the application, please refer to the corresponding README.
It provides everything needed to set up, develop, and deploy that part of the project.