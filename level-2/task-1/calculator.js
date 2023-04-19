let inputElement = document.getElementById("inputElement");
let clearElement = document.getElementById("clear");
let enterEle = document.getElementById("enter");
let delEle = document.getElementById("del");
let ansEle = document.getElementById("ans");
let displayEle = document.getElementById("display");
let expression = "";


function evaluation() {
    function infixToPostfix(infix) {
        const precedence = {
            "+": 1,
            "-": 1,
            "x": 2,
            "/": 2,
            "%": 2,
            "√": 3,
            "±": 3
        };

        const stack = [];
        const postfix = [];

        infix = infix.replace(/\s+/g, ""); // remove whitespace

        for (let i = 0; i < infix.length; i++) {
            const token = infix[i];
            if (!isNaN(parseFloat(token)) || token === ".") {
                let j = i + 1;
                while (j < infix.length && (infix[j] === "." || !isNaN(parseFloat(infix[j])))) {
                    console.log(infix[j]);
                    j++;
                }

                postfix.push(parseFloat(infix.substring(i, j)));
                i = j - 1;
            } else if (Object.keys(precedence).includes(token)) {
                while (
                    stack.length > 0 &&
                    Object.keys(precedence).includes(stack[stack.length - 1]) &&
                    precedence[token] <= precedence[stack[stack.length - 1]]
                ) {
                    postfix.push(stack.pop());
                }
                stack.push(token);
            } else if (token === "(") {
                stack.push(token);
            } else if (token === ")") {
                while (stack.length > 0 && stack[stack.length - 1] !== "(") {
                    postfix.push(stack.pop());
                }
                stack.pop(); // remove left parenthesis
            }
        }

        while (stack.length > 0) {
            postfix.push(stack.pop());
        }

        return postfix;
    }


    function evaluatePostfix(postfix) {
        const stack = [];
        const operators = {
            "+": (a, b) => a + b,
            "-": (a, b) => a - b,
            "x": (a, b) => a * b,
            "/": (a, b) => a / b,
            "%": (a, b) => a % b,
            "√": (a) => Math.sqrt(a),
            "±": (a) => -a
        };

        for (let i = 0; i < postfix.length; i++) {
            const token = postfix[i];
            if (!isNaN(parseFloat(token))) {
                stack.push(parseFloat(token));
            } else if (Object.keys(operators).includes(token)) {
                if (token === "√" || token === "±") {
                    const operand = stack.pop();
                    const result = operators[token](operand);
                    stack.push(result);
                } else {
                    const rightOperand = stack.pop();
                    const leftOperand = stack.pop();
                    const result = operators[token](leftOperand, rightOperand);
                    stack.push(result);
                }
            }
        }

        return stack.pop();
    }

    return evaluatePostfix(infixToPostfix(expression));
}

delEle.addEventListener("click", () => inputElement.value = "");

clearElement.addEventListener("click", () => {
    displayEle.textContent = "";
    inputElement.value = "";
});

ansEle.addEventListener("click", () => {
    expression = inputElement.value;
    if (expression !== "" || inputElement.textContent !== "") {
        displayEle.textContent = inputElement.value;
        inputElement.value = "";
        inputElement.value = evaluation();
    }

});

enterEle.addEventListener("click", () => {
    displayEle.textContent = inputElement.value;
});

let openPars = () => inputElement.value += "(";
let closePars = () => inputElement.value += ")";

//numbers
let num0 = () => inputElement.value += "0";
let num1 = () => inputElement.value += "1";
let num2 = () => inputElement.value += "2";
let num3 = () => inputElement.value += "3";
let num4 = () => inputElement.value += "4";
let num5 = () => inputElement.value += "5";
let num6 = () => inputElement.value += "6";
let num7 = () => inputElement.value += "7";
let num8 = () => inputElement.value += "8";
let num9 = () => inputElement.value += "9";
let dot = () => inputElement.value += ".";

//operators 
let mod = () => inputElement.value += "%";
let mult = () => inputElement.value += "x";
let div = () => inputElement.value += "/";
let plus = () => inputElement.value += "+";
let minus = () => inputElement.value += "-";
let root = () => inputElement.value += "√";
let negate = () => inputElement.value += "±";
