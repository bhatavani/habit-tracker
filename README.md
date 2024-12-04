 Smart Habit Tracker

Smart Habit Tracker is a Node.js-based application that helps users track their habits, send daily updates via WebSocket, generate weekly reports, and store data using file-based persistence.

Features

- Add, update, and delete habits.  
- Receive real-time updates via WebSocket.  
- Generate and retrieve weekly reports.  
- Data persistence using file-based storage

Requirements

- Node.js
- VS code(Editor)
- Postman API

API endpoints
-POST	/habits	Add a new habit
-GET	/habits	Get all habits
-PUT	/habits/:id	Update an existing habit
-DELETE	/habits/:id	Delete a habit
-GET	/reports/weekly	Retrieve weekly report
