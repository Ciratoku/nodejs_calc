const calculate = require("./calc.js");
const operators = require("./operators.js");
const readline = require("node:readline");

async function* questions(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    for (;;) {
      yield new Promise((resolve) => rl.question(query, resolve));
    }
  } finally {
    rl.close();
  }
}

function addOperation(operation) {
  const info = JSON.parse(`[${operation}]`);
  const arguments = info[1] == "unary" ? "op" : "op1, op2";
  const body = "return ".concat(info[3]);
  const math = new Function(arguments, body);
  return [
    info[0],
    {
      type: info[1],
      priority: info[2],
      math,
    },
  ];
}

async function run() {
  for await (const answer of questions("Добавьте операцию: ")) {
    if (answer == "stop") break;
    const newOp = addOperation(answer);
    operators.set(newOp[0], newOp[1]);
    console.log([...operators.entries()]);
  }
  for await (const answer of questions("Введите выражение: ")) {
    if (answer == "stop") break;
    console.log(`Результат: ${calculate(answer, operators)}`);
  }
}

run();
