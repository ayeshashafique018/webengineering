// 🌸 Constructor Function
function Expense(desc, amount, category) {
  this.desc = desc;
  this.amount = amount;
  this.category = category;
}

// 🌷 Prototype for Display
Expense.prototype.display = function (index) {
  return (
    "<tr>" +
    "<td>" + this.desc + "</td>" +
    "<td>Rs " + this.amount + "</td>" +
    "<td>" + this.category + "</td>" +
    "<td><button class='delete-btn' onclick='deleteExpense(" + index + ")'>Delete</button></td>" +
    "</tr>"
  );
};

var expenses = [];

var form = document.getElementById("expenseForm");
var tableBody = document.querySelector("#expenseTable tbody");
var totalDisplay = document.getElementById("totalDisplay");
var filter = document.getElementById("filter");
var resetBtn = document.getElementById("resetBtn");

// 🌼 Event Listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();
  try {
    addExpense();
  } catch (err) {
    alert(err);
  }
});

filter.addEventListener("change", function () {
  displayExpenses();
});

resetBtn.addEventListener("click", function () {
  if (confirm("Are you sure you want to reset all data? 🧹")) {
    expenses = [];
    displayExpenses();
  }
});

// 💫 Add Expense with Validation
function addExpense() {
  var desc = document.getElementById("desc").value.trim();
  var amount = document.getElementById("amount").value.trim();
  var category = document.getElementById("category").value;

  // 🧠 Validation with try...catch
  try {
    if (desc === "" || amount === "" || category === "") {
      throw "⚠️ All fields are required!";
    }
    if (isNaN(amount) || amount <= 0) {
      throw "💰 Amount must be a valid positive number!";
    }

    var newExpense = new Expense(desc, parseFloat(amount), category);
    expenses.push(newExpense);

    displayExpenses();
    form.reset();
  } catch (error) {
    alert(error);
  }
}

// 🩵 Display Function
function displayExpenses() {
  tableBody.innerHTML = "";
  var total = 0;

  for (var i = 0; i < expenses.length; i++) {
    var exp = expenses[i];

    // 🌸 Filtering Logic
    if (filter.value === "All" || filter.value === exp.category) {
      tableBody.innerHTML += exp.display(i);
      total += exp.amount;
    }
  }

  totalDisplay.textContent = "Total: Rs " + total;
}

// ❌ Delete Expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  displayExpenses();
}
