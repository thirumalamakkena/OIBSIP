let inputElement = document.getElementById("inputElement");
let clearElement =  document.getElementById("clear");
let enterEle = document.getElementById("enter");
let ansEle = document.getElementById("ans");


function errorDisplay(){
    let userInput = inputElement.value;
    let lastChar = userInput[userInput.length -1];
    if (typeof(lastChar) === "string"){
        console.log(typeof(lastChar));
    }
}

function evaluation(){
     
    var stackarr = [];
    var topp = -1;
    
    function push(e) {
    	topp++;
    	stackarr[topp] = e;
    }
    
    // Pop function for returning top element
    function pop() {
    	if (topp === -1)
    		return 0;
    	else {
    		var popped_ele = stackarr[topp];
    		topp--;
    		return popped_ele;
    	}
    }
    
    // Function to check whether the passed
    // character is operator or not
    function operator(op) {
    	if (op === '+' || op === '-' ||
    		op === '^' || op === '*' ||
    		op === '/' || op === '(' ||
    		op === ')') {
    		return true;
    	}
    	else
    		return false;
    }
    
    // Function to return the precedency of operator
    function precedency(pre) {
    	if (pre === '@' || pre === '(' || pre === ')') {
    		return 1;
    	}
    	else if (pre === '+' || pre === '-') {
    		return 2;
    	}
    	else if (pre === '/' || pre === '*') {
    		return 3;
    	}
    	else if (pre === '^') {
    		return 4;
    	}
    	else
    		return 0;
    }
    
    // Function to convert Infix to Postfix
    function InfixtoPostfix() {
    
    	// Postfix array created
    	var postfix = [];
    	var temp = 0;
    	push('@');
    	var infixval = inputElement.value;
    
    	// Iterate on infix string
    	for (var i = 0; i < infixval.length; i++) {
    		var el = infixval[i];
    
    		// Checking whether operator or not
    		if (operator(el)) {
    			if (el === ')') {
    				while (stackarr[topp] !== "(") {
    					postfix[temp++] = pop();
    				}
    				pop();
    			}
    
    			// Checking whether el is ( or not
    			else if (el === '(') {
    				push(el);
    			}
    
    			// Comparing precedency of el and
    			// stackarr[topp]
    			else if (precedency(el) > precedency(stackarr[topp])) {
    				push(el);
    			}
    			else {
    				while (precedency(el) <=
    					precedency(stackarr[topp]) && topp > -1) {
    					postfix[temp++] = pop();
    				}
    				push(el);
    			}
    		}
    		else {
    			postfix[temp++] = el;
    		}
    	}
    
    	// Adding character until stackarr[topp] is @
    	while (stackarr[topp] !== '@') {
    		postfix[temp++] = pop();
    	}
    
    	// String to store postfix expression
    	var st = "";
    	for (let i = 0; i < postfix.length; i++)
    		st += postfix[i];
    
    	return st;
    
    }
    
    function evaluatePostfix(exp)
    {
	//create a stack
		let stack=[];
		
		// Scan all characters one by one
		for(let i=0;i<exp.length;i++)
		{
			let c=exp[i];
			
			// If the scanned character is an operand (number here),
			// push it to the stack.
			if(! isNaN( parseInt(c) ))
			stack.push(c.charCodeAt(0) - '0'.charCodeAt(0));
			
			// If the scanned character is an operator, pop two
			// elements from stack apply the operator
			else
			{
				let val1 = stack.pop();
				let val2 = stack.pop();
				
				switch(c)
				{
					case '+':
					stack.push(val2+val1);
					break;
					
					case '-':
					stack.push(val2- val1);
					break;
					
					case '/':
					stack.push(val2/val1);
					break;
					
					case '*':
					stack.push(val2*val1);
					break;
			    }
			}
		}
		return stack.pop();
    }
    return evaluatePostfix(InfixtoPostfix());

}
ansEle.addEventListener("click", () =>{
    console.log(evaluation());
});
