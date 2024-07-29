Array.prototype.peek = function(){
    return this[this.length - 1];
}

const operators = new Map([
    ['*', {priority: "3", math: (op1, op2) => {return op1*op2}}],
    ['/', {priority: "3", math: (op1, op2) => {return op1/op2}}],
    ['+', {priority: "2", math: (op1, op2) => {
        if(op1) return op1 + op2; // binary
        return op2; // unary
    }}],
    ['-', {priority: "2", math: (op1, op2) => {
        if(op1) return op1 - op2; // binary
        return -op2; // unary
    }}],
    ['(', {priority: "1"}]
]);

function toPostfix(statement){
    let tokens = statement.split(''), opstack = [], postfix = [], isFloat = false, isNumber = false;
    tokens.forEach(token => {
        if(token == " ") return;
        else if(token == '.'){
            isFloat = true;
            postfix[postfix.length - 1] += token;
        }
        else if(token.match(/\d/)){
            if(isFloat || isNumber) postfix[postfix.length - 1] += token;
            else postfix.push(token);
            isNumber = true;
        }
        else if(token == "("){
            isFloat = isNumber = false;
            opstack.push(token);
        }
        else if(token == ")"){
            isFloat = isNumber = false;
            let subtoken = opstack.pop();
            while(subtoken != "("){
                postfix.push(subtoken);
                subtoken = opstack.pop();
            };
        } else if(operators.has(token)){
            isFloat = isNumber = false;
            while(opstack.length && operators.get(opstack.peek()).priority >= operators.get(token).priority) postfix.push(opstack.pop());
            opstack.push(token);
        }
    });
    while(opstack.length) postfix.push(opstack.pop());
    return postfix;
}

function calculate(statement){
    let opstack = [], tokens = toPostfix(statement);
    tokens.forEach(token => {
        if(operators.has(token)){
            const first = opstack.pop(), second = opstack.pop();
            opstack.push(operators.get(token).math(second, first));
        } else opstack.push(parseFloat(token));
    });
    return opstack.pop().toFixed(2);
}

module.exports = calculate;