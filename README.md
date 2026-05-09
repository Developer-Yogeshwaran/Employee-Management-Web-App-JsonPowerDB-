# Employee Management Web App (JsonPowerDB)

## Project Title
Employee Management System - Introduction to JsonPowerDB (student mini project)

## Description
A professional frontend-only Employee Management application demonstrating comprehensive CRUD operations using JsonPowerDB (JPDB). The project uses HTML5, CSS3, JavaScript, jQuery, and a lightweight `jpdb-commons.js` helper to make JSON API calls to JsonPowerDB with advanced features like search, sort, and dark mode.

## Features

### Core CRUD Operations
- ✅ Create (Save) employee records (PUT)
- ✅ Read (Retrieve) employee records (GET)
- ✅ Update existing employee records (UPDATE)
- ✅ Delete employee records (REMOVE)

## Advanced Features
- 📊 Dashboard with real-time stats (Total Employees, Total Payroll, Average Salary, Departments)
- 📈 Department distribution chart with employee count percentages
- 🔍 Search employees by ID, Name, or Email
- 🏢 Filter employees by Department
- ✕ Clear all filters instantly
- 📋 Load and display all employees in a responsive table
- ⬍ Sort employees by name
- 📥 Export employee data to CSV file
- 🌙 Dark mode toggle (saved to browser)
- ✏️ Edit employees directly from table
- 🗑️ Delete employees from table

### Form Fields
- Employee ID *
- Employee Name *
- Employee Email *
- Employee Phone
- Employee Salary *
- Department (dropdown)
- Employee Designation

### Validation
- ✓ Required fields validation (ID, Name, Email, Salary)
- ✓ Email format validation
- ✓ Numeric salary validation
- ✓ User-friendly error messages with emojis

### UI/UX Features
- Modern, clean design with gradient header
- Responsive layout (desktop & mobile)
- Smooth animations and transitions
- Dark/Light mode toggle with localStorage persistence
- Professional table with hover effects
- Icons for better visual appeal
- Real-time search filtering

## Technologies Used
- **Frontend:** HTML5, CSS3 (with CSS Grid, Flexbox, Animations), JavaScript (ES6)
- **Libraries:** jQuery (for AJAX & DOM manipulation)
- **Database:** JsonPowerDB (JPDB) REST API
- **Storage:** LocalStorage API
- **Backend Compatibility:** MySQL, PostgreSQL, SQL Server (via JPDB)

## Files
- `index.html` - Main UI, form, and table layout
- `style.css` - Professional responsive styling with dark mode
- `index.js` - CRUD logic, validation, search, sort, and dark mode
- `jpdb-commons.js` - Lightweight helper for JPDB AJAX requests
- `README.md` - Project documentation

## Database: JsonPowerDB (JPDB) with MySQL Support

### JsonPowerDB Configuration
**Base URL:** `http://api.login2explore.com:5577`

**JPDB Commands Used:**
- `PUT` - Insert new records (mapped to MySQL INSERT)
- `GET` - Retrieve records (mapped to MySQL SELECT)
- `UPDATE` - Modify existing records (mapped to MySQL UPDATE)
- `REMOVE` - Delete records (mapped to MySQL DELETE)

**API Endpoint:** `/api/irl`

### Database Backend
- JsonPowerDB is a cloud-based database that uses MySQL as its underlying database engine
- All employee records are stored in JsonPowerDB cloud database
- Data is automatically synced and can be accessed from MySQL if configured
- No local database setup required - everything is cloud-based via JPDB

### Where to Place Your JPDB Token

Open `index.js` and locate this line (around line 7):

\`\`\`javascript
const JPDB_TOKEN = "<PUT_YOUR_JPDB_TOKEN_HERE>";
\`\`\`

Replace `<PUT_YOUR_JPDB_TOKEN_HERE>` with your actual JsonPowerDB connection token.

**Example:**
\`\`\`javascript
const JPDB_TOKEN = "ab123cd456ef789gh0ij1k2l3m4n5o6p";
\`\`\`

You may also customize:
- `DB_NAME` - Default: "EMP-DB"
- `REL_NAME` - Default: "EMP-TABLE"

## Setup Instructions

1. **Clone or Download the Repository**
   ```bash
   git clone https://github.com/Developer-Yogeshwaran/Employee-Management-Web-App-JsonPowerDB-.git
   cd EmployeeJPDB
   ```

2. **Add Your JPDB Token**
   - Open `index.js` file
   - Find line 7: `const JPDB_TOKEN = "<PUT_YOUR_JPDB_TOKEN_HERE>"`
   - Replace with your actual JsonPowerDB connection token
   - Save the file

3. **Open in Browser**
   - Simply open `index.html` file in your web browser
   - Or use any local web server (see options below)

### Local Web Server Options (Optional)
If you prefer to run with a web server:

- **Python 3:** 
  ```bash
  python -m http.server 8000
  ```
  Then visit: `http://localhost:8000`

- **Python 2:** 
  ```bash
  python -m SimpleHTTPServer 8000
  ```

- **Node.js (http-server):** 
  ```bash
  npx http-server
  ```

- **Live Server (VS Code):** 
  - Right-click `index.html` → Open with Live Server

4. **Start Using**
   - Fill employee details in the form
   - Click **Save** to add new employees
   - Click **Load All** to view all employees
   - Use **Search** to find employees
   - Click edit (✏️) or delete (🗑️) icons in the table
   - Toggle **Dark Mode** with the moon icon (🌙)
   - Export data to CSV using **Export CSV** button

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes
- This is a pure frontend app; no backend server required
- All employee data is stored in JsonPowerDB cloud database (powered by MySQL)
- No need to set up or configure MySQL locally
- Dark mode preference is saved in browser localStorage
- Responsive design works on mobile, tablet, and desktop
- Search and sort operations work client-side for instant feedback
- All CRUD operations communicate directly with JPDB via REST API

## Course Use
This project is prepared for the course **"Introduction to JsonPowerDB"** as a mini project submission. It demonstrates:
- CRUD operations with REST APIs
- Client-side form validation
- Asynchronous AJAX calls
- DOM manipulation with jQuery
- Data filtering and sorting
- Modern UI/UX principles

## Screenshots Features
- Professional gradient header
- Clean card-based layout
- Responsive data table
- Real-time search filtering
- Dark mode support
- Mobile-friendly design
