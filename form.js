// 🌸 Dynamic Form Builder & Validator (ES5)
var form = document.getElementById("dynamicForm");
var addTextBtn = document.getElementById("addTextBtn");
var addEmailBtn = document.getElementById("addEmailBtn");
var addDropdownBtn = document.getElementById("addDropdownBtn");
var submitBtn = document.getElementById("submitBtn");

addTextBtn.addEventListener("click", function() { addField("text"); });
addEmailBtn.addEventListener("click", function() { addField("email"); });
addDropdownBtn.addEventListener("click", function() { addField("dropdown"); });

function addField(type) {
  var fieldWrapper = document.createElement("div");
  var label = document.createElement("label");
  var input;

  // 🌷 Switch Statement for Different Field Types
  switch (type) {
    case "text":
      label.textContent = "Text Field:";
      input = document.createElement("input");
      input.type = "text";
      break;

    case "email":
      label.textContent = "Email Field:";
      input = document.createElement("input");
      input.type = "email";
      break;

    case "dropdown":
      label.textContent = "Dropdown:";
      input = document.createElement("select");

      var defaultOption = document.createElement("option");
      defaultOption.text = "--Select--";
      defaultOption.value = "";
      input.add(defaultOption);

      var options = ["Option 1", "Option 2", "Option 3"];
      for (var i = 0; i < options.length; i++) {
        var opt = document.createElement("option");
        opt.value = options[i];
        opt.text = options[i];
        input.add(opt);
      }
      break;
  }

  input.classList.add("field");
  fieldWrapper.appendChild(label);
  fieldWrapper.appendChild(input);
  form.appendChild(fieldWrapper);
}

// 🌸 Validation with try...catch
submitBtn.addEventListener("click", function() {
  try {
    validateForm();
    alert("🎉 All fields are valid! Form submitted successfully.");
  } catch (err) {
    alert(err);
  }
});

function validateForm() {
  var fields = form.getElementsByClassName("field");

  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];
    field.classList.remove("invalid");

    if (field.type === "text") {
      if (field.value.trim() === "") {
        field.classList.add("invalid");
        throw "⚠️ Please fill in all text fields.";
      }
    }

    if (field.type === "email") {
      var emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!emailPattern.test(field.value)) {
        field.classList.add("invalid");
        throw "📧 Please enter a valid email address.";
      }
    }

    if (field.tagName === "SELECT") {
      if (field.value === "") {
        field.classList.add("invalid");
        throw "⬇️ Please select an option from the dropdown.";
      }
    }
  }
}
