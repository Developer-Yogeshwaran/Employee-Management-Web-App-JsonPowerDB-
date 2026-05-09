/*
  index.js - handles form actions, validations, and CRUD operations using jpdb-commons.js
  Features: Save, Update, Delete, Search, Load All, Sort, Dark Mode, Export CSV, Department Filter, Stats Dashboard
  Replace the TOKEN value with your JsonPowerDB connection token before using.
*/

// Configuration - update TOKEN with your JPDB connection token.
const JPDB_TOKEN = "<PUT_YOUR_JPDB_TOKEN_HERE>"; // <-- place your token here
const DB_NAME = "EMP-DB";   // change if you have a different DB
const REL_NAME = "EMP-TABLE"; // change relation name if needed

let allEmployees = []; // Store all fetched records for search/sort

$(function(){
  // Form buttons
  $('#saveBtn').on('click', saveEmployee);
  $('#updateBtn').on('click', updateEmployee);
  $('#deleteBtn').on('click', deleteEmployee);
  $('#resetBtn').on('click', resetForm);
  $('#exportBtn').on('click', exportToCSV);

  // Search & Display
  $('#searchInput').on('keyup', searchEmployees);
  $('#deptFilter').on('change', filterByDepartment);
  $('#loadAllBtn').on('click', loadAllEmployees);
  $('#sortBtn').on('click', sortEmployees);
  $('#clearFiltersBtn').on('click', clearAllFilters);

  // Dark mode toggle
  $('#themeToggle').on('click', toggleDarkMode);

  // Load theme preference
  if(localStorage.getItem('theme')==='dark') enableDarkMode();

  // When ID field loses focus, attempt to fetch existing record
  $('#empId').on('blur', function(){
    const id = $(this).val().trim();
    if(id) fetchEmployee(id);
  });
});

// Toggle dark mode
function toggleDarkMode(){
  $('body').toggleClass('dark-mode');
  if($('body').hasClass('dark-mode')){
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
}

function enableDarkMode(){
  $('body').addClass('dark-mode');
}

// Update dashboard stats
function updateStats(){
  if(allEmployees.length === 0){
    $('#totalEmps').text('0');
    $('#totalSalary').text('$0');
    $('#avgSalary').text('$0');
    $('#totalDepts').text('0');
    return;
  }

  // Total employees
  $('#totalEmps').text(allEmployees.length);

  // Total salary
  const totalSalary = allEmployees.reduce((sum, emp) => {
    const sal = parseInt(emp.EmployeeSalary) || 0;
    return sum + sal;
  }, 0);
  $('#totalSalary').text('$' + totalSalary.toLocaleString());

  // Average salary
  const avgSalary = Math.round(totalSalary / allEmployees.length);
  $('#avgSalary').text('$' + avgSalary.toLocaleString());

  // Total departments
  const depts = new Set(allEmployees.map(e => e.EmployeeDept).filter(Boolean));
  $('#totalDepts').text(depts.size);

  // Department distribution chart
  buildDeptChart();
}

function buildDeptChart(){
  const deptMap = {};
  allEmployees.forEach(emp => {
    if(emp.EmployeeDept){
      deptMap[emp.EmployeeDept] = (deptMap[emp.EmployeeDept] || 0) + 1;
    }
  });

  let html = '';
  const total = allEmployees.length;
  Object.entries(deptMap).forEach(([dept, count]) => {
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    html += `<div class="dept-bar">
      <div class="dept-bar-name">${dept}</div>
      <div class="dept-bar-count">${count}</div>
      <div class="dept-bar-pct">${pct}%</div>
    </div>`;
  });
  $('#deptChart').html(html || '<p class="no-data">No department data</p>');
}

// Validate form fields. Returns {valid:boolean, message:string}
function validateForm(isForSave=true){
  const id = $('#empId').val().trim();
  const name = $('#empName').val().trim();
  const salary = $('#empSalary').val().trim();
  const email = $('#empEmail').val().trim();

  if(!id){ return {valid:false, message:'⚠️ Employee ID is required.'}; }
  if(!name){ return {valid:false, message:'⚠️ Employee Name is required.'}; }
  if(!email){ return {valid:false, message:'⚠️ Employee Email is required.'}; }
  if(!salary){ return {valid:false, message:'⚠️ Salary is required.'}; }

  // Salary: numeric only
  if(!/^\d+(\.\d+)?$/.test(salary)){
    return {valid:false, message:'⚠️ Salary must be a number.'};
  }

  // Email format basic validation
  if(!/^\S+@\S+\.\S+$/.test(email)){
    return {valid:false, message:'⚠️ Email format is invalid.'};
  }

  return {valid:true, message:''};
}

function showMessage(text, isError=false){
  const $m = $('#msg');
  $m.text(text).css('color', isError? '#e44b3a':'#10b981');
}

function getFormData(){
  return {
    EmployeeID: $('#empId').val().trim(),
    EmployeeName: $('#empName').val().trim(),
    EmployeeSalary: $('#empSalary').val().trim(),
    EmployeeEmail: $('#empEmail').val().trim(),
    EmployeePhone: $('#empPhone').val().trim(),
    EmployeeDept: $('#empDept').val(),
    EmployeeDesignation: $('#empDesignation').val().trim(),
    EmployeeStatus: $('#empStatus').val()
  };
}

/* SAVE (PUT) */
function saveEmployee(){
  const v = validateForm(true);
  if(!v.valid){ showMessage(v.message, true); return; }
  const data = getFormData();

  const req = jpdb.createPUTRequest(JPDB_TOKEN, DB_NAME, REL_NAME, data);
  showMessage('💾 Saving...');
  jpdb.executeCommand(req, function(res){
    showMessage('✅ Saved successfully.');
    resetForm();
    loadAllEmployees(); // Refresh table
  }, function(err){
    showMessage('❌ Error saving record.', true);
  });
}

/* FETCH (GET) */
function fetchEmployee(empId){
  if(!empId) return;
  const req = jpdb.createGETRequest(JPDB_TOKEN, DB_NAME, REL_NAME, {EmployeeID: empId});
  showMessage('🔍 Fetching...');
  jpdb.executeCommand(req, function(res){
    let record = null;
    if(res && res.data && res.data.length>0) record = res.data[0];
    else if(res && res.record) record = res.record;

    if(record){
      $('#empName').val(record.EmployeeName || '');
      $('#empSalary').val(record.EmployeeSalary || '');
      $('#empEmail').val(record.EmployeeEmail || '');
      $('#empPhone').val(record.EmployeePhone || '');
      $('#empDept').val(record.EmployeeDept || '');
      $('#empDesignation').val(record.EmployeeDesignation || '');
      $('#empStatus').val(record.EmployeeStatus || 'Active');
      showMessage('✅ Record loaded.');
    } else {
      showMessage('❌ No record found for ID: ' + empId, true);
    }
  }, function(){ showMessage('❌ Error fetching record.', true); });
}

/* UPDATE */
function updateEmployee(){
  const v = validateForm(false);
  if(!v.valid){ showMessage(v.message, true); return; }
  const data = getFormData();
  const oldKey = { EmployeeID: data.EmployeeID };

  const req = jpdb.createUPDATERequest(JPDB_TOKEN, DB_NAME, REL_NAME, oldKey, data);
  showMessage('✏️ Updating...');
  jpdb.executeCommand(req, function(res){
    showMessage('✅ Updated successfully.');
    resetForm();
    loadAllEmployees();
  }, function(){
    showMessage('❌ Update failed.', true);
  });
}

/* DELETE (REMOVE) */
function deleteEmployee(){
  const id = $('#empId').val().trim();
  if(!id){ showMessage('❌ Employee ID is required to delete.', true); return; }
  const req = jpdb.createREMOVERequest(JPDB_TOKEN, DB_NAME, REL_NAME, {EmployeeID: id});
  if(!confirm('🗑️ Delete employee with ID ' + id + '?')) return;
  showMessage('🗑️ Deleting...');
  jpdb.executeCommand(req, function(){
    showMessage('✅ Deleted successfully.');
    resetForm();
    loadAllEmployees();
  }, function(){
    showMessage('❌ Delete failed.', true);
  });
}

/* Load ALL employees */
function loadAllEmployees(){
  showMessage('📋 Loading all records...');
  const req = jpdb.createGETRequest(JPDB_TOKEN, DB_NAME, REL_NAME, {});
  jpdb.executeCommand(req, function(res){
    allEmployees = [];
    if(res && res.data && Array.isArray(res.data)){
      allEmployees = res.data;
    }
    displayTable(allEmployees);
    updateStats();
    $('#deptFilter').val('');
    $('#searchInput').val('');
    showMessage('✅ Loaded ' + allEmployees.length + ' records.');
  }, function(){
    showMessage('❌ Error loading records.', true);
  });
}

/* Search employees */
function searchEmployees(){
  const query = $('#searchInput').val().toLowerCase();
  let filtered = allEmployees;

  if(query){
    filtered = filtered.filter(emp =>
      emp.EmployeeID.toLowerCase().includes(query) ||
      emp.EmployeeName.toLowerCase().includes(query) ||
      emp.EmployeeEmail.toLowerCase().includes(query)
    );
  }

  // Also apply department filter if selected
  const selectedDept = $('#deptFilter').val();
  if(selectedDept){
    filtered = filtered.filter(emp => emp.EmployeeDept === selectedDept);
  }

  displayTable(filtered);
}

/* Filter by department */
function filterByDepartment(){
  searchEmployees(); // Reuse search to apply both filters
}

/* Clear all filters */
function clearAllFilters(){
  $('#searchInput').val('');
  $('#deptFilter').val('');
  displayTable(allEmployees);
  showMessage('✅ Filters cleared');
}

/* Sort employees */
function sortEmployees(){
  allEmployees.sort((a,b) => a.EmployeeName.localeCompare(b.EmployeeName));
  displayTable(allEmployees);
  showMessage('⬍ Sorted by Name');
}

/* Display table */
function displayTable(employees){
  const $tbody = $('#empTableBody');
  if(!employees || employees.length === 0){
    $tbody.html('<tr><td colspan="9" class="no-data">No employees found.</td></tr>');
    return;
  }
  let html = '';
  employees.forEach(emp => {
    html += `<tr>
      <td>${emp.EmployeeID}</td>
      <td>${emp.EmployeeName}</td>
      <td>${emp.EmployeeEmail}</td>
      <td>${emp.EmployeePhone || '—'}</td>
      <td>${emp.EmployeeDept || '—'}</td>
      <td>${emp.EmployeeDesignation || '—'}</td>
      <td>$${parseInt(emp.EmployeeSalary).toLocaleString()}</td>
      <td><span style="color:#10b981;font-weight:500">${emp.EmployeeStatus || 'Active'}</span></td>
      <td class="actions">
        <span class="edit-icon" onclick="loadToForm('${emp.EmployeeID}')">✏️</span>
        <span class="delete-icon" onclick="deleteFromTable('${emp.EmployeeID}')">🗑️</span>
      </td>
    </tr>`;
  });
  $tbody.html(html);
}

/* Load record to form from table */
function loadToForm(empId){
  const emp = allEmployees.find(e => e.EmployeeID === empId);
  if(emp){
    $('#empId').val(emp.EmployeeID);
    $('#empName').val(emp.EmployeeName);
    $('#empEmail').val(emp.EmployeeEmail);
    $('#empPhone').val(emp.EmployeePhone || '');
    $('#empSalary').val(emp.EmployeeSalary);
    $('#empDept').val(emp.EmployeeDept || '');
    $('#empDesignation').val(emp.EmployeeDesignation || '');
    $('#empStatus').val(emp.EmployeeStatus || 'Active');
    showMessage('✅ Record loaded to form.');
    window.scrollTo(0, 0);
  }
}

/* Delete from table */
function deleteFromTable(empId){
  if(!confirm('🗑️ Delete employee with ID ' + empId + '?')) return;
  const req = jpdb.createREMOVERequest(JPDB_TOKEN, DB_NAME, REL_NAME, {EmployeeID: empId});
  jpdb.executeCommand(req, function(){
    showMessage('✅ Deleted successfully.');
    loadAllEmployees();
  }, function(){
    showMessage('❌ Delete failed.', true);
  });
}

/* Export to CSV */
function exportToCSV(){
  if(allEmployees.length === 0){
    showMessage('❌ No data to export.', true);
    return;
  }

  const headers = ['ID', 'Name', 'Email', 'Phone', 'Department', 'Designation', 'Salary', 'Status'];
  let csv = headers.join(',') + '\n';

  allEmployees.forEach(emp => {
    const row = [
      emp.EmployeeID,
      emp.EmployeeName,
      emp.EmployeeEmail,
      emp.EmployeePhone || '',
      emp.EmployeeDept || '',
      emp.EmployeeDesignation || '',
      emp.EmployeeSalary,
      emp.EmployeeStatus || 'Active'
    ].map(field => `"${field}"`).join(',');
    csv += row + '\n';
  });

  // Trigger download
  const blob = new Blob([csv], {type: 'text/csv'});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'employees_' + new Date().getTime() + '.csv';
  a.click();
  window.URL.revokeObjectURL(url);

  showMessage('✅ CSV exported successfully.');
}

/* Reset form */
function resetForm(){
  $('#empForm')[0].reset();
  $('#msg').text('');
}
