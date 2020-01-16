const numberButtons = document.querySelectorAll('.number-keys [data-number]');
const operations = document.querySelectorAll('[data-operation]');
const scientificOperations = document.querySelectorAll(
	'.function-keys [data-science]'
);
const allClear = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equals = document.querySelector('[data-equals]');
const answer = document.querySelector('[data-answer]');
const previousOperandTextElement = document.querySelector(
	'[data-previousOperand]'
);
const currentOperandTextElement = document.querySelector(
	'[data-currentOperand]'
);

class Calculator {
	constructor(previousOperandTextElement, currentOperandTextElement) {
		this.currentOperandTextElement = currentOperandTextElement;
		this.previousOperandTextElement = previousOperandTextElement;
		this.clear();
	}
	clear() {
		this.currentOperand = '';
		this.previousOperand = '';
		this.operation = undefined;
	}
	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}
	appendNumber(number) {
		if (number === '.' && this.currentOperand.includes('.')) return;
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}
	chooseOperation(operation) {
		if (this.currentOperand === '') return;
		if (this.previousOperand !== '') {
			this.compute();
		}
		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}
	chooseScientificFunction(scientific) {
		if (this.currentOperand === '') return;
		if (this.previousOperand !== '') {
			this.calculate();
		}
		this.scientific = scientific;
		this.previousOperand = this.currentOperand;
	}

	calculate() {
		let calculation;
		let inCalc = parseFloat(this.currentOperand);

		if (isNaN(inCalc)) return;
		switch (this.scientific) {
			case 'sin':
				calculation = Math.sin((inCalc * Math.PI) / 180);
				break;
			case 'cos':
				calculation = Math.cos((inCalc * Math.PI) / 180);
				break;
			case 'hyp':
				calculation = Math.hypot(inCalc);
				break;
			case '√':
				calculation = Math.sqrt(inCalc);
				break;
			case 'log':
				calculation = Math.log10(inCalc);
				break;
			case 'log2':
				calculation = Math.log2(inCalc);
				break;
			case 'tan':
				calculation = Math.tan((inCalc * Math.PI) / 180);
				break;
			case 'ln':
				calculation = Math.log(inCalc);
				break;
			case 'x-1':
				calculation = inCalc ** -1;
				break;
			case 'x2':
				calculation = inCalc ** 2;
				break;
			case 'π':
				calculation = inCalc * Math.PI;
				break;
		}
		this.currentOperand = calculation;
		this.scientific = undefined;
	}
	compute() {
		let computation;
		let prev = parseFloat(this.previousOperand);
		let current = parseFloat(this.currentOperand);
		if (isNaN(prev) || isNaN(current)) return;
		switch (this.operation) {
			case '+':
				computation = prev + current;
				break;
			case 'x':
				computation = prev * current;
				break;
			case '-':
				computation = prev - current;
				break;
			case '÷':
				computation = prev / current;
				break;
			case 'x10x':
				computation = prev * 10 ** current;
				break;
			default:
				return;
		}
		this.currentOperand = computation;
		this.operation = undefined;
		this.previousOperand = '';
	}
	getDisplayNumber(number) {
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split('.')[0]);
		const decimalDigits = stringNumber.split('.')[1];

		let integerDisplay;
		if (isNaN(integerDigits)) {
			integerDisplay = '';
		} else {
			integerDisplay = integerDigits.toLocaleString('en', {
				maximumFractionDigits: 0
			});
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	}
	updateDisplay() {
		this.currentOperandTextElement.innerText = this.getDisplayNumber(
			this.currentOperand
		);
		if (this.operation != null) {
			this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
		} else {
			this.previousOperandTextElement.innerText = '';
		}
	}
}
const calculator = new Calculator(
	previousOperandTextElement,
	currentOperandTextElement
);
numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});
operations.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});
scientificOperations.forEach(button => {
	button.addEventListener('click', event => {
		calculator.chooseScientificFunction(button.innerText);
		calculator.updateDisplay();
	});
});
allClear.addEventListener('click', () => {
	calculator.clear();
	calculator.updateDisplay();
});
equals.addEventListener('click', () => {
	calculator.compute();
	calculator.updateDisplay();
});
deleteButton.addEventListener('click', () => {
	calculator.delete();
	calculator.updateDisplay();
});
answer.addEventListener('click', () => {
	calculator.computation();
});
