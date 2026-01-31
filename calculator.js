const input = document.getElementById("inputBox");
const buttons = document.querySelectorAll("button");

let expression = "";

/* ---------- Button Click Handling ---------- */
buttons.forEach(button => {
  button.addEventListener("click", () => {
    handleInput(button.innerText);
  });
});

/* ---------- Keyboard Handling ---------- */
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (
    (key >= "0" && key <= "9") ||
    ["+", "-", "*", "/", "%", "."].includes(key)
  ) {
    handleInput(key);
  }

  if (key === "Enter") {
    e.preventDefault();
    handleInput("=");
  }

  if (key === "Backspace") {
    handleInput("DEL");
  }

  if (key === "Escape") {
    handleInput("AC");
  }
});

/* ---------- Core Logic Controller ---------- */
function handleInput(value) {
  if (value === "=") {
    calculate();
  } 
  else if (value === "AC") {
    expression = "";
    updateDisplay("0");
  } 
  else if (value === "DEL") {
    expression = expression.slice(0, -1);
    updateDisplay(expression || "0");
  } 
  else {
    expression += value;
    updateDisplay(expression);
  }
}

/* ---------- Safe Calculation ---------- */
function calculate() {
  try {
    expression = eval(expression).toString();
    updateDisplay(expression);
  } catch {
    updateDisplay("Error");
    expression = "";
  }
}

/* ---------- UI Sync ---------- */
function updateDisplay(value) {
  input.value = value;
}
