const body = document.querySelector("body");
const h1 = document.querySelector("h1");
const themeText = document.querySelector(".theme-text");
const circleBtn = document.querySelector(".input-circle");
const circle = document.querySelector(".circle");
const inputRectangle = document.querySelector(".input-rectangle");
const textNumbers = document.querySelector(".text-numbers");
const buttons = document.querySelectorAll(".btn");
const deleteBtn = document.querySelector(".delete");
const resetBtn = document.querySelector(".resetBtn");
const equalBtn = document.querySelector(".equalBtn");
const display = document.querySelector(".display-wrapper");
const keyboard = document.querySelector(".keyboard");
const themeNumber = document.querySelectorAll(".theme-number");
let theme = 1;

const elementArray = [
  body,
  h1,
  themeText,
  circle,
  inputRectangle,
  textNumbers,
  [...buttons],
  deleteBtn,
  resetBtn,
  equalBtn,
  display,
  keyboard,
  [...themeNumber],
];

function toggleThemeClass(className, action) {
  elementArray.forEach((element) => {
    if (typeof element.forEach === "function") {
      element.forEach((el) => el.classList[action](className));
    } else {
      element.classList[action](className);
    }
  });
}

function transitionToTheme2() {
  toggleThemeClass("theme2", "add");
}

function transitionToTheme3() {
  toggleThemeClass("theme3", "add");
}

function deleteClassTheme2() {
  toggleThemeClass("theme2", "remove");
}

function deleteClassTheme3() {
  toggleThemeClass("theme3", "remove");
}

circleBtn.addEventListener("click", () => {
  deleteClassTheme2();
  deleteClassTheme3();
  if (theme === 1) {
    transitionToTheme2();
    theme++;
  } else if (theme === 2) {
    transitionToTheme3();
    theme++;
  } else if (theme === 3) {
    theme = 1;
  }
});

let currentInput = "";
let justCalculated = false;
const operators = "+-*/";
let isError = false;

function handleNumberInput(value) {
  if (justCalculated) {
    currentInput = value;
    justCalculated = false;
  } else {
    if (value === ".") {
      if (currentInput === "" || /[+\-*/.]$/.test(currentInput)) {
        return;
      }
      const lastNumber = currentInput.split(/[\+\-\*\/]/).pop();
      if (!lastNumber.includes(".")) {
        currentInput += value;
      }
    } else {
      currentInput += value;
    }
  }
  textNumbers.textContent = currentInput;
}

function handleBtnOperator(operator) {
  if (justCalculated) {
    justCalculated = false;
  }

  if (operator) {
    if (currentInput === "" && operator !== "-") {
      return;
    }

    const lastChar = currentInput[currentInput.length - 1];
    if ("+-*/".includes(lastChar)) {
      currentInput = currentInput.slice(0, -1) + operator;
    } else if (!/[+\-*/.]$/.test(currentInput)) {
      currentInput += operator;
    }
    textNumbers.textContent = currentInput;
  }
}

function handleDeleteBtn() {
  currentInput = currentInput.slice(0, -1);
  textNumbers.textContent = currentInput || 0;
}

function handleResetBtn() {
  currentInput = "";
  textNumbers.textContent = 0;
}

function handleEqualBtn() {
  if (/[+\-*/.]$/.test(currentInput)) {
    textNumbers.textContent = "Error";
    currentInput = "";
    isError = true;
    return;
  }

  try {
    const result = calculator(currentInput);
    textNumbers.textContent = result;
    currentInput = result.toString();
  } catch (error) {
    textNumbers.textContent = "Error";
    currentInput = "";
    isError = true;
  }
  justCalculated = true;
}

keyboard.addEventListener("click", (e) => {
  const button = e.target.closest(".btn");

  if (!button) {
    return;
  }

  if (isError) {
    currentInput = "";
    textNumbers.textContent = "";
    isError = false;
  }

  if (button.classList.contains("btn-number")) {
    const value = button.textContent.trim();
    handleNumberInput(value);
  } else if (button.classList.contains("btn-operator")) {
    const operator = button.dataset.operator;
    handleBtnOperator(operator);
  } else if (button.classList.contains("delete")) {
    handleDeleteBtn();
  } else if (button.classList.contains("resetBtn")) {
    handleResetBtn();
  } else if (button.classList.contains("equalBtn")) {
    handleEqualBtn();
  }
});

function calculator(expr) {
  let tokens = negativeHandler(expr);

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === "*" || tokens[i] === "/") {
      const left = parseFloat(tokens[i - 1]);
      const right = parseFloat(tokens[i + 1]);
      const result =
        tokens[i] === "*" ? left * right : right === 0 ? "Error" : left / right;
      if (result === "Error") {
        return "Error";
      }
      tokens.splice(i - 1, 3, result.toString());
      i -= 1;
    }
  }

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === "+" || tokens[i] === "-") {
      const left = parseFloat(tokens[i - 1]);
      const right = parseFloat(tokens[i + 1]);
      const result = tokens[i] === "+" ? left + right : left - right;
      tokens.splice(i - 1, 3, result.toString());
      i -= 1;
    }
  }
  return tokens[0];
}

function negativeHandler(expr) {
  const tokens = [];
  let current = "";

  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];

    if ("+-*/".includes(char)) {
      if (char === "-" && (i === 0 || "+-*/".includes(expr[i - 1]))) {
        current += char;
      } else {
        if (current) {
          tokens.push(current);
          tokens.push(char);
          current = "";
        }
      }
    } else {
      current += char;
    }
  }
  if (current) {
    tokens.push(current);
  }
  return tokens;
}
