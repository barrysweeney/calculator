const buttons = document.querySelectorAll("button");
let display = document.getElementById("display");
let equalsButton = document.getElementById("=");
let cancelButton = document.getElementById("cancel");
let displayContent = "";
let solution = 0;
let digits = [];
let operators = [];
let operator;
let operands;
let num1;
let num2;

// Adds buttons to the display when clicked unless they are equals or cancel
// In which case the corresponding function is called instead
buttons.forEach((button) => {
    if (button.className === "displayable" || button.className === "operations") {
        button.addEventListener('click', (e) => {
            if (button.id === "cancel") {
                clearDisplay();
            } else if (button.id === "=") {
                equalsOperation();
            } else {
                addToDisplay(button.id);
            }
        });
    }
});

// Provides keyboard functionality
window.addEventListener('keydown', function (e) {
    const btn = document.querySelector(`button[data-key="${e.key}"]`);
    if (!btn) {
        return;
    }
    if (btn.id === "cancel") {
        clearDisplay();
    } else if (btn.id === "=") {
        equalsOperation();
    } else {
        addToDisplay(btn.id);
    }
})

function addToDisplay(element) {
    displayContent += element;
    display.innerHTML = displayContent;
}

function clearDisplay() {
    displayContent = "";
    display.innerHTML = displayContent;
    solution = 0;
}

function equalsOperation() {
    if (expressionIsNotComplete()) {
        alert("Please finish expression");
    } else {
        findOperands(displayContent);
        findOperators(displayContent);
        findSolution();
        displaySolution();
    }
}

function expressionIsNotComplete() {
    if (displayContent[displayContent.length - 1] === "+" ||
        displayContent[displayContent.length - 1] === "-" ||
        displayContent[displayContent.length - 1] === "x" ||
        displayContent[displayContent.length - 1] === "/"){
            return true;
        } else {
            return false;
        }
}

function findOperands(stringToCheck) {
    operands = stringToCheck.split(/[^0-9]/);
}

function findOperators(stringToCheck) {
    operators = stringToCheck.split(/[0-9]/).filter(v => v !== "");
}

function findSolution() {
    while (operators.length != 0) {
        operate(operators[0], operands[0], operands[1]);
        operands.shift();
        operands.shift();
        operands.splice(0, 0, solution)
        operators.shift();
    }
}

function operate(operator, num1, num2) {
    switch (operator) {
        case "+": add(num1, num2);
            break;
        case "-": subtract(num1, num2);
            break;
        case "x": multiply(num1, num2);
            break;
        case "/": divide(num1, num2);
    }
}

function displaySolution() {
    displayContent = Math.round(solution * 10) / 10;
    display.innerHTML = displayContent;
}

function add(num1, num2) { solution = (parseInt(num1) + parseInt(num2)); }

function subtract(num1, num2) { solution = (parseInt(num1) - parseInt(num2)); }

function multiply(num1, num2) { solution = (parseInt(num1) * parseInt(num2)); }

function divide(num1, num2) {
    if (num2 === "0") {
        alert("Can't divide by zero")
        clearDisplay();
    } else {
        solution = (parseInt(num1) / parseInt(num2));
    }
}