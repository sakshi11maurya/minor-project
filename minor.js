// Calendar Script JS
const calendar = document.getElementById('calendar');
const monthSelect = document.getElementById('monthSelect');
const yearInput = document.getElementById('yearInput');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const viewEventsBtn = document.getElementById('viewEventsBtn');

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getStorageKey(year, month) {
  return `calendar-notes-${year}-${month}`;
}

function loadNotes(year, month) {
  const key = getStorageKey(year, month);
  const notesJSON = localStorage.getItem(key);
  return notesJSON ? JSON.parse(notesJSON) : {};
}

function saveNotes(year, month, notes) {
  const key = getStorageKey(year, month);
  localStorage.setItem(key, JSON.stringify(notes));
}

function generateCalendar(month, year) {
  calendar.innerHTML = '';

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && (today.getMonth() + 1) === parseInt(month, 10);
  const notes = loadNotes(year, month);

  // Add day headers
  for (let day of daysOfWeek) {
    const div = document.createElement('div');
    div.className = 'day header';
    div.textContent = day;
    calendar.appendChild(div);
  }

  const firstDay = new Date(year, parseInt(month, 10) - 1, 1);
  const startDay = firstDay.getDay();
  const lastDate = new Date(year, parseInt(month, 10), 0).getDate();

  // Add empty placeholders before 1st
  for (let i = 0; i < startDay; i++) {
    const empty = document.createElement('div');
    empty.className = 'day empty';
    calendar.appendChild(empty);
  }

  for (let i = 1; i <= lastDate; i++) {
    const day = document.createElement('div');
    day.className = 'day';
    day.textContent = i;

    if (isCurrentMonth && i === today.getDate()) {
      day.classList.add('today');
    }

    if (notes[i]) {
      day.setAttribute('data-note', notes[i]);
      const dot = document.createElement('span');
      dot.className = 'note-indicator';
      day.appendChild(dot);
    }

    day.addEventListener('click', () => {
      const currentNote = notes[i] || '';
      const newNote = prompt(`Add/Edit note for ${year}-${String(month).padStart(2, '0')}-${String(i).padStart(2, '0')}:`, currentNote);
      if (newNote === null) return;

      if (newNote.trim() === '') {
        delete notes[i];
      } else {
        notes[i] = newNote.trim();
      }

      saveNotes(year, month, notes);
      generateCalendar(month, year);
    });

    calendar.appendChild(day);
  }
}

function updateCalendar() {
  const selectedMonth = monthSelect.value;
  const selectedYear = parseInt(yearInput.value, 10);

  if (!selectedYear || selectedYear < 1 || selectedYear > 9999) {
    alert("Please enter a valid year (1-9999).");
    return;
  }

  generateCalendar(selectedMonth, selectedYear);
}

// Prev month
prevBtn.addEventListener('click', () => {
  let month = parseInt(monthSelect.value, 10);
  let year = parseInt(yearInput.value, 10);

  month -= 1;
  if (month < 1) {
    month = 12;
    year -= 1;
  }

  monthSelect.value = String(month).padStart(2, '0');
  yearInput.value = year;
  updateCalendar();
});

// Next month
nextBtn.addEventListener('click', () => {
  let month = parseInt(monthSelect.value, 10);
  let year = parseInt(yearInput.value, 10);

  month += 1;
  if (month > 12) {
    month = 1;
    year += 1;
  }

  monthSelect.value = String(month).padStart(2, '0');
  yearInput.value = year;
  updateCalendar();
});

// Input changes
monthSelect.addEventListener('change', updateCalendar);
yearInput.addEventListener('input', () => {
  if (yearInput.value.length === 4) updateCalendar();
});

// View Events page button
viewEventsBtn.addEventListener('click', () => {
  const month = monthSelect.value;
  const year = yearInput.value;

  if (!year || year < 1 || year > 9999) {
    alert('Please enter a valid year.');
    return;
  }

  window.location.href = `events.html?year=${year}&month=${month}`;
});

// Initialize
const now = new Date();
monthSelect.value = String(now.getMonth() + 1).padStart(2, '0');
yearInput.value = now.getFullYear();

updateCalendar();

function addNumbers() {
  const input = document.getElementById("numbers").value;
  
  // Split by comma, trim spaces, and convert to numbers
  const numberArray = input.split(",").map(num => parseFloat(num.trim()));
  
  // Check for any invalid number
  if (numberArray.some(isNaN)) {
    document.getElementById("result").textContent = "Please enter only valid numbers separated by commas.";
    return;
  }

  // Calculate sum
  const sum = numberArray.reduce((acc, num) => acc + num, 0);
  document.getElementById("result").textContent = "Sum: " + sum;
}


function calculatePercentage() {
      const number = parseFloat(document.getElementById('number').value);
      const percent = parseFloat(document.getElementById('percent').value);

      if (isNaN(number) || isNaN(percent)) {
        document.getElementById('result').innerText = "Please enter valid numbers.";
        return;
      }

      const result = (number * percent) / 100;
      document.getElementById('result').innerText = `${percent}% of ${number} is ${result}`;
    }


    function subtractNumbers() {
  const num1 = parseFloat(document.getElementById("num1").value);
  const num2 = parseFloat(document.getElementById("num2").value);
  const resultOutput = document.getElementById("result");

  if (isNaN(num1) || isNaN(num2)) {
    resultOutput.textContent = "Please enter valid numbers.";
    return;
  }

  const result = num1 - num2;
  resultOutput.textContent = "Result: " + result;
}



let total = 0;

function addExpense() {
  const item = document.getElementById("item").value.trim();
  const amount = parseFloat(document.getElementById("amount").value.trim());
  const expenseList = document.getElementById("expenseList");
  const totalAmount = document.getElementById("totalAmount");

  if (!item || isNaN(amount)) {
    alert("Please enter valid item name and amount.");
    return;
  }

  const li = document.createElement("li");
  li.textContent = `${item}: ₹${amount.toFixed(2)}`;
  expenseList.appendChild(li);

  total += amount;
  totalAmount.textContent = total.toFixed(2);

  document.getElementById("item").value = "";
  document.getElementById("amount").value = "";
}



document.getElementById('updateSummary').addEventListener('click', updateMonthlySummary);

function updateMonthlySummary() {
  const incomeInputs = document.querySelectorAll('.income-input');
  const expenseInputs = document.querySelectorAll('.expense-input');

  let totalIncome = 0;
  let totalExpenses = 0;

  incomeInputs.forEach(input => {
    const value = parseFloat(input.value) || 0;
    totalIncome += value;
  });

  expenseInputs.forEach(input => {
    const value = parseFloat(input.value) || 0;
    totalExpenses += value;
  });

  const netSavings = totalIncome - totalExpenses;

  document.getElementById('totalIncome').innerText = `₹${totalIncome}`;
  document.getElementById('totalExpenses').innerText = `₹${totalExpenses}`;
  document.getElementById('netSavings').innerText = `₹${netSavings}`;
}


// Call this function wherever necessary (like after adding data)



const expenses = [];
let chart;

document.getElementById('addExpenseBtn').addEventListener('click', () => {
  const amount = parseFloat(document.getElementById('expenseAmount').value);
  const desc = document.getElementById('expenseDesc').value.trim();

  if (!amount || !desc) {
    alert('Please enter amount and description.');
    return;
  }

  expenses.push({ amount, desc });
  document.getElementById('expenseAmount').value = '';
  document.getElementById('expenseDesc').value = '';

  updateExpenseList();
  updateSummary();
  updateChart();
});

function updateExpenseList() {
  const list = document.getElementById('expenseList');
  list.innerHTML = '';
  expenses.forEach((e, i) => {
    const li = document.createElement('li');
    li.textContent = `${e.desc}: ₹${e.amount}`;
    list.appendChild(li);
  });
}

function updateSummary() {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  document.getElementById('summary').textContent = `Total Expenses: ₹${total}`;
}

function updateChart() {
  const ctx = document.getElementById('expenseChart').getContext('2d');
  const labels = expenses.map(e => e.desc);
  const data = expenses.map(e => e.amount);

  if (chart) chart.destroy(); // Destroy previous chart if any

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Expenses',
        data: data,
        backgroundColor: 'rgba(255, 99, 132, 0.6)'
      }]
    }
  });
}






