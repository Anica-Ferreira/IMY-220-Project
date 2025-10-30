Anica Ferreira u24581802

IMY220 Project

GitHub Link
https://github.com/Anica-Ferreira/IMY-220-Project

Docker command to run
docker compose up -d --build

App URL
http://localhost:3000


Explanation of directory structure

/backend:
The backend handles all the server-side logic, database connections, and API routes. It also manages uploaded files and images.

Sub-Folders:
    /controllers - contains all functions that handle requests
    /db - database connection setup and configuration used in controllers
    /routes - API routes that map endpoints to controller functions

/frontend:
Handles the UI, user interactions, and communication with the backend via fetch or API calls.

Sub-Folders:
    -/components - contains reusable UI elements like forms, header, footer
    -/pages - contains full pages of the app with necessary components and handle routes