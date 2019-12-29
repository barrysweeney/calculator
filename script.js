window.addEventListener('keydown', function (e) {
    const btn = document.querySelector(`button[data-key="${e.key}"]`);
    if (!btn) { return; }
    if (btn.id === "cancel") {
        clearDisplay();
    } else if (btn.id === "=") { equalsOperation(); } else {
        addToDisplay(btn.id);
    }
})

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

let display = document.getElementById("display");
let displayContent = "";
let solution = 0;
let digits = [];
let operator;
let num1;
let num2;
let operators = []
let operands;

function addToDisplay(element) {
    displayContent += element;
    display.innerHTML = displayContent;
}

function clearDisplay() {
    displayContent = "";
    display.innerHTML = displayContent;
    solution = 0;
}

const buttons = document.querySelectorAll("button")
buttons.forEach((button) => {
    if (button.className === "displayable" || button.className === "operations") {
        button.addEventListener('click', (e) => {
            addToDisplay(button.id);
        });
    }
});

let equalsButton = document.getElementById("=");
equalsButton.addEventListener('click', (e) => {
    equalsOperation();
})

function equalsOperation() {
    if (displayContent[displayContent.length - 1] === "+" ||
        displayContent[displayContent.length - 1] === "-" ||
        displayContent[displayContent.length - 1] === "x" ||
        displayContent[displayContent.length - 1] === "/") {
        alert("Please finish expression");
    } else {
        findOperands(displayContent);
        findOperators(displayContent);
        findSolution();
        displaySolution();
    }
}

function findOperands(stringToCheck) {
    operands = stringToCheck.split(/[^0-9]/);
}

function findOperators(stringToCheck) {
    operators = stringToCheck.split(/[0-9]/).filter(v => v !== "");
}

let cancelButton = document.getElementById("cancel");
cancelButton.addEventListener('click', (e) => {
    clearDisplay();
});

function findSolution() {
    while (operators.length != 0) {
        operate(operators[0], operands[0], operands[1]);
        operands.shift();
        operands.shift();
        operands.splice(0, 0, solution)
        operators.shift();
    }

}

function displaySolution() {
    displayContent = Math.round(solution * 10) / 10;
    display.innerHTML = displayContent;
}