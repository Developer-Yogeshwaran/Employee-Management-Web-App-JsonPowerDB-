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
- HTML5
- CSS3 (with CSS Grid, Flexbox, Animations)
- JavaScript (ES6)
- jQuery (for AJAX & DOM manipulation)
- JsonPowerDB (JPDB) REST API
- LocalStorage API

## Files
- `index.html` - Main UI, form, and table layout
- `style.css` - Professional responsive styling with dark mode
- `index.js` - CRUD logic, validation, search, sort, and dark mode
- `jpdb-commons.js` - Lightweight helper for JPDB AJAX requests
- `README.md` - Project documentation

## JsonPowerDB Details
**Base URL:** `http://api.login2explore.com:5577`

**JPDB Commands Used:**
- `PUT` - Insert new records
- `GET` - Retrieve records
- `UPDATE` - Modify existing records
- `REMOVE` - Delete records

**API Endpoint:** `/api/irl`

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

## How to Run (VS Code + Live Server)

### Prerequisites
- VS Code installed
- Live Server extension installed

### Steps

1. **Open Folder in VS Code**
   ```bash
   code c:\Users\Yogeshwaran\EmployeeJPDB
   ```

2. **Add Your JPDB Token**
   - Open `index.js`
   - Find line 7: `const JPDB_TOKEN = ...`
   - Replace with your token

3. **Start Live Server**
   - Right-click `index.html`
   - Select "Open with Live Server"
   - App opens at `http://127.0.0.1:5500`

4. **Use the Application**
   - Fill employee details and click **Save**
   - Click **Load All** to view all employees
   - Use search to filter records
   - Click edit icon (✏️) to load a record
   - Click delete icon (🗑️) to remove a record
   - Toggle dark mode with the moon icon (🌙)

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes
- This is a pure frontend app; no backend server required
- All data is stored in JsonPowerDB
- Dark mode preference is saved in browser localStorage
- Responsive design works on mobile, tablet, and desktop
- Search and sort operations work client-side for instant feedback

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
