const operators = new Map([
  ["*", { priority: "3", math: (op1, op2) => op1 * op2, type: "binary" }],
  ["/", { priority: "3", math: (op1, op2) => op1 / op2, type: "binary" }],
  [
    "+",
    {
      priority: "2",
      math: (op1, op2) => {
        if (op1) return op1 + op2; // binary
        return op2; // unary
      },
      type: "binary",
    },
  ],
  [
    "-",
    {
      priority: "2",
      math: (op1, op2) => {
        if (op1) return op1 - op2; // binary
        return -op2; // unary
      },
      type: "binary",
    },
  ],
  ["(", { priority: "1" }],
]);
module.exports = operators;
