let inputElement = document.getElementById("inputElement");
let clearElement = document.getElementById("clear");
let enterEle = document.getElementById("enter");
let ansEle = document.getElementById("ans");
let expression = document.getElementById("display");
expression.textContent = "";

function errorDisplay() {
  let userInput = inputElement.value;
  let lastChar = userInput[userInput.length - 1];
  if (typeof lastChar === "string") {
    console.log(typeof lastChar);
  }
}

clearElement.addEventListener("click", () => {
  expression.textContent = "";
  inputElement.value = "";
});

let del = () => (inputElement.value = "");

function evaluation() {
  function infixToPostfix(infix) {
    const precedence = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
      "%": 2,
      "√": 3,
      "+/-": 3,
    };

    const stack = [];
    const postfix = [];

    infix = infix.replace(/\s+/g, ""); // remove whitespace
    console.log(infix);
    for (let i = 0; i < infix.length; i++) {
      const token = infix[i];
      if (!isNaN(parseFloat(token))) {
        let j = i + 1;
        while (j < infix.length && !isNaN(parseFloat(infix[j]))) {
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
      "*": (a, b) => a * b,
      "/": (a, b) => a / b,
      "%": (a, b) => a % b,
      "√": (a) => Math.sqrt(a),
      "+/-": (a) => -a,
    };

    for (let i = 0; i < postfix.length; i++) {
      const token = postfix[i];
      if (!isNaN(parseFloat(token))) {
        stack.push(parseFloat(token));
      } else if (Object.keys(operators).includes(token)) {
        if (token === "√" || token === "+/-") {
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

  return evaluatePostfix(infixToPostfix(expression.textContent));
}

ansEle.addEventListener("click", () => {
  expression.textContent += inputElement.value;
  inputElement.value = "";
  inputElement.value = evaluation();
});

let openPars = () => (inputElement.value += "(");
let closePars = () => (inputElement.value += ")");

let num0 = () => {
  inputElement.value += "0";
};
let num1 = () => {
  inputElement.value += "1";
};
let num2 = () => {
  inputElement.value += "2";
};
let num3 = () => {
  inputElement.value += "3";
};
let num4 = () => {
  inputElement.value += "4";
};
let num5 = () => {
  inputElement.value += "5";
};
let num6 = () => {
  inputElement.value += "6";
};
let num7 = () => {
  inputElement.value += "7";
};
let num8 = () => {
  inputElement.value += "8";
};
let num9 = () => {
  inputElement.value += "9";
};

let dot = () => {
  inputElement.value += ".";
};

let mod = () => {
  (expression.textContent += inputElement.value + "%"),
    (inputElement.value = "");
};
let mult = () => {
  (expression.textContent += inputElement.value + "*"),
    (inputElement.value = "");
};
let div = () => {
  (expression.textContent += inputElement.value + "/"),
    (inputElement.value = "");
};
let plus = () => {
  (expression.textContent += inputElement.value + "+"),
    (inputElement.value = "");
};
let minus = () => {
  (expression.textContent += inputElement.value + "-"),
    (inputElement.value = "");
};
let root = () => {
  (expression.textContent += inputElement.value + "√"),
    (inputElement.value = "");
};
let negate = () => {
  (expression.textContent += inputElement.value), (inputElement.value = "");
};

let enter = () => {
  inputElement.value = "";
};
