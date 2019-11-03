const numberButtons = document.querySelectorAll(".number-keys [data-number]");
const operations = document.querySelectorAll("[data-operation]");
const scientificFunctions = document.querySelectorAll(
	".function-keys [data-function]"
);
const allClear = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equals = document.querySelector("[data-equals]");
const answer = document.querySelector("[data-answer]");
const previousOperandTextElement = document.querySelector(
	"[data-previousOperand]"
);
const currentOperandTextElement = document.querySelector(
	"[data-currentOperand]"
);

class Calculator {
	constructor(previousOperandTextElement, currentOperandTextElement) {
		this.currentOperandTextElement = currentOperandTextElement;
		this.previousOperandTextElement = previousOperandTextElement;
		this.clear();
	}
	clear() {
		this.currentOperand = "";
		this.previousOperand = "";
		this.operation = undefined;
	}
	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}
	appendNumber(number) {
		if (number === "." && this.currentOperand.includes(".")) return;
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}
	chooseOperation(operation) {
		if (this.currentOperand === "") return;
		if (this.previousOperand !== "") {
			this.compute();
		}
		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = "";
	}
	chooseFunction(functions) {
		if (this.currentOperand === "") return;
		if (this.previousOperand !== "") {
			this.science();
		}
		this.functions = functions;
		this.previousOperand = this.currentOperand;
		this.currentOperand = "";
	}
	compute() {
		let computation;
		let prev = parseFloat(this.previousOperand);
		let current = parseFloat(this.currentOperand);
		if (isNaN(prev) || isNaN(current)) return;
		switch (this.operation) {
			case "+":
				computation = prev + current;
				break;
			case "x":
				computation = prev * current;
				break;
			case "-":
				computation = prev - current;
				break;
			case "÷":
				computation = prev / current;
				break;
			case "x10x":
				computation = prev * 10 ** current;
				break;
			default:
				return;
		}
		this.currentOperand = computation;
		this.operation = undefined;
		this.previousOperand = "";
	}
	science() {
		let computate;
		let current = parseFloat(this.previousOperand);
		switch (this.functions) {
			case "sin":
				computate = Math.sin(current);
				break;
			case "cos":
				computate = Math.cos(current);
				break;
			case "tan":
				computate = Math.tan(current);
				break;
			case "hyp":
				computate = Math.hypot(current);
				break;
			case "log":
				computate = Math.log10;
				break;
			case "x":
				computate = 1 / current;
				break;
			default:
				return;
		}
		this.currentOperand = computate;
		this.functions = undefined;
	}
	getDisplayNumber(number) {
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split(".")[0]);
		const decimalDigits = stringNumber.split(".")[1];

		let integerDisplay;
		if (isNaN(integerDigits)) {
			integerDisplay = "";
		} else {
			integerDisplay = integerDigits.toLocaleString("en", {
				maximumFractionDigits: 0
			});
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	}
	getFunction(funct) {}
	updateDisplay() {
		this.currentOperandTextElement.innerText = this.getDisplayNumber(
			this.currentOperand
		);
		if (this.operation != null) {
			this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
		} else {
			this.previousOperandTextElement.innerText = "";
		}
	}
}
const calculator = new Calculator(
	previousOperandTextElement,
	currentOperandTextElement
);
numberButtons.forEach(button => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});
operations.forEach(button => {
	button.addEventListener("click", () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});
scientificFunctions.forEach(button => {
	button.addEventListener("click", () => {
		calculator.chooseFunction(button.innerText);
		calculator.updateDisplay();
	});
});
allClear.addEventListener("click", () => {
	calculator.clear();
	calculator.updateDisplay();
});
equals.addEventListener("click", () => {
	calculator.compute();
	calculator.updateDisplay();
});
deleteButton.addEventListener("click", () => {
	calculator.delete();
	calculator.updateDisplay();
});
answer.addEventListener("click", () => {
	calculator.computation();
});
