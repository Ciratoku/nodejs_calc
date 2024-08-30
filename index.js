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

function validateAddOp(operation) {
  const types = ["unary", "binary"];
  let parsed;
  try {
    parsed = JSON.parse(`[${operation}]`);
  } catch (err) {
    return "Parsing error";
  }
  const [op, type, priority, body] = parsed;
  if (op.length != 1) return "Operation length must be equal 1";
  if (operators.has(op)) return "Such operation exists";
  if (!types.includes(type)) return "Type must be either unary or binary";
  if (typeof priority != "number") return "Priority must be a number";
  if (type === "binary" && (!body.includes("op1") || !body.includes("op2")))
    return "Body function must have 2 parameters";
  return "added";
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
    if (answer == "skip") break;
    const validated = validateAddOp(answer);
    if (validated !== "added") {
      console.log(validated);
      continue;
    }
    const newOp = addOperation(answer);
    operators.set(newOp[0], newOp[1]);
  }
  for await (const answer of questions("Введите выражение: ")) {
    if (answer == "stop") break;
    console.log(`Результат: ${calculate(answer, operators)}`);
  }
}

run();
