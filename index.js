const calculate = require('./calc.js');
const readline = require('node:readline');
const {
    stdin: input,
    stdout: output,
} = require('node:process');

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

  async function run() {
    for await (const answer of questions("Введите выражение: ")) {
        if (answer == "stop") break;
        console.log(`Результат: ${calculate(answer)}`);
    }
  }
  
  run();
