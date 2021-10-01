// Variables
let memoryAns = 0;
let firstNumber = 0;
let secondNumber = 0;
let firstInput = true; // Check for if the number on screen is the first input
let operatorCalled = false; // Used for clearing the display after selecting an operator
let operatorPrevCalled = false; // Used for continuous input of operators
let equalCalled = false; // Used for continuous input of equal
let selectedOperator = "";

// Other functions
const fixPrecision = (number) => {
	return parseFloat(number.toFixed(12));
}

// Calculator functions
const addNumber = (number) => {
	// Clearing the display after an input following an operators
	if (operatorCalled) {
		operatorCalled = false;
		clearDisplay();
	}

	// Handling Clear/All Clear text display
	if (!firstInput) {
		setClearStatus(1);
	}

	// Used for continuous input of equal
	equalCalled = false;

	// Handling zeros
	if (Math.abs(display.textContent != 0) || display.textContent.includes(".")) {
		if (display.textContent.match().length)
			display.textContent += number;
	}
	else {
		// Handling negative zero
		if (display.textContent.charAt(0) == "-") {
			display.textContent = -number;
		}
		else {
			display.textContent = number;
		}
	}
}

const selectOperator = (operator) => {
	// Allows for consecutive inputs of operators to quickly go over equations
	if (operatorPrevCalled && !operatorCalled) {
		computeEqual();
	}

	operatorCalled = true;
	operatorPrevCalled = true;
	equalCalled = false;
	firstInput = false;
	firstNumber = display.textContent;
	selectedOperator = operator;
}

const setClearStatus = (status) => {
	switch (status) {
		case 0:
			clear.textContent = "AC"
			break;
		case 1:
			clear.textContent = "C";
	}
}

const clearDisplay = () => {
	operatorCalled = false;
	equalCalled = false;

	// All clear calculator
	if (display.textContent == "0" && clear.textContent == "AC") {
		// console.log("Calculator cleared")
		firstInput = true;
		firstNumber = 0;
		secondNumber = 0;
	}

	// Handling Clear/All Clear text display
	if (!firstInput) {
		setClearStatus(0);
	}

	display.textContent = "0";
}

const callAns = () => {
	// Handling Clear/All Clear text display
	if (!firstInput) {
		setClearStatus(1);
	}

	// Used for continuous input of equal
	equalCalled = false;

	display.textContent = memoryAns;
}

const computeEqual = () => {
	// Used for continuous input of equal
	if (equalCalled) {
		operatorCalled = false;
		firstNumber = display.textContent;
	}
	else {
		secondNumber = display.textContent;
	}

	switch (selectedOperator) {
		case "+":
			display.textContent = fixPrecision(parseFloat(firstNumber) + parseFloat(secondNumber));
			break;
		case "-":
			display.textContent = fixPrecision(parseFloat(firstNumber) - parseFloat(secondNumber));
			break;
		case "x":
			display.textContent = fixPrecision(parseFloat(firstNumber) * parseFloat(secondNumber));
			break;
		case "÷":
			display.textContent = fixPrecision(parseFloat(firstNumber) / parseFloat(secondNumber));
			break;
	}

	// Function for ANS
	memoryAns = display.textContent;

	operatorCalled = true;
	operatorPrevCalled = false;
	equalCalled = true;
}

const computePercent = () => {
	// Don't clear the display after an input following an operator (Contrary to the other functions)
	operatorCalled = false;
	equalCalled = false;

	// Handling Clear/All Clear text display
	if (!firstInput) {
		setClearStatus(1);
	}

	display.textContent /= 100;
}

const addDot = () => {
	// Clearing the display after an input after calling an operator
	if (operatorCalled) {
		operatorCalled = false;
		clearDisplay();
	}

	// Handling Clear/All Clear text display
	if (!firstInput) {
		setClearStatus(1);
	}

	// Toggle on/off the dot
	if (!display.textContent.includes(".")) {
		display.textContent = display.textContent + ".";
	}
	else if (display.textContent.slice(-1) == ".") {
		display.textContent = display.textContent.slice(0, -1);
	}
}

const doPlusMinus = () => {
	// Clearing the display after an input after calling an operator
	if (operatorCalled) {
		operatorCalled = false;
		clearDisplay();
	}

	// Handling Clear/All Clear text display
	if (!firstInput) {
		setClearStatus(1);
	}

	// Toggle on/off the plus/minus
	if (display.textContent.charAt(0) == "-") {
		display.textContent = display.textContent.substr(1);;
	}
	else {
		display.textContent = "-" + display.textContent;
	}
}

const keyPress = (key) => {
	// Numbers
	if (isFinite(key)) addNumber(key)

	// Operators
	if (key == "+" || key == "-" || key == "*" || key == "/") selectOperator(key)

	// Equal
	if (key == "Enter") computeEqual()

	// Dot
	if (key == ".") addDot()

	// Clear
	if (key == "Backspace" || key == "Escape") clearDisplay()
}

// Selecting all the elements
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const display = document.querySelector("#display");
const clear = document.querySelector("#clear");
const ans = document.querySelector("#ans");
const equal = document.querySelector("#equal");
const percent = document.querySelector("#percent");
const dot = document.querySelector("#dot");
const plusminus = document.querySelector("#plusminus");

// Adding click events to each element
numbers.forEach(e => { e.addEventListener("click", () => addNumber(e.textContent)) })
operators.forEach(e => { e.addEventListener("click", () => selectOperator(e.textContent)) })
clear.addEventListener("click", () => clearDisplay())
ans.addEventListener("click", () => callAns())
equal.addEventListener("click", () => computeEqual())
percent.addEventListener("click", () => computePercent())
dot.addEventListener("click", () => addDot())
plusminus.addEventListener("click", () => doPlusMinus())

// Keyboard support
document.addEventListener("keyup", (e) => keyPress(e.key))

