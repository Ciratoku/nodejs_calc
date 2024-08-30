Array.prototype.peek = function () {
  return this[this.length - 1];
};

function toPostfix(statement, operators) {
  let tokens = statement.split(""),
    opstack = [],
    postfix = [],
    isFloat = false,
    isNumber = false;
  tokens.forEach((token) => {
    if (token == " ") return;
    else if (token == ".") {
      isFloat = true;
      postfix[postfix.length - 1] += token;
    } else if (token.match(/\d/)) {
      if (isFloat || isNumber) postfix[postfix.length - 1] += token;
      else postfix.push(token);
      isNumber = true;
    } else if (token == "(") {
      isFloat = isNumber = false;
      opstack.push(token);
    } else if (token == ")") {
      if (!opstack.includes("(")) throw new Error("No open bracket");
      isFloat = isNumber = false;
      let subtoken = opstack.pop();
      while (subtoken != "(") {
        postfix.push(subtoken);
        subtoken = opstack.pop();
      }
    } else if (operators.has(token)) {
      isFloat = isNumber = false;
      while (
        opstack.length &&
        operators.get(opstack.peek()).priority >= operators.get(token).priority
      )
        postfix.push(opstack.pop());
      opstack.push(token);
    }
  });
  if (opstack.includes("(")) throw new Error("No close bracket");
  while (opstack.length) postfix.push(opstack.pop());
  return postfix;
}

function calculate(statement, operators) {
  let opstack = [],
    tokens = toPostfix(statement, operators);
  tokens.forEach((token) => {
    const operator = operators.get(token);
    if (operator) {
      let first = opstack.pop(),
        second;
      if (operator.type == "binary") {
        second = opstack.pop();
        opstack.push(operator.math(second, first));
      } else {
        opstack.push(operator.math(first));
      }
    } else opstack.push(parseFloat(token));
  });
  const res = opstack.pop().toString().split(".");
  if (res[1]) {
    return parseFloat(res.join(".")).toFixed(2);
  }
  return parseInt(res[0]);
}
module.exports = calculate;
