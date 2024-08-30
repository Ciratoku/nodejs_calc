const calculate = require("../calc");
const operators = require("../operators.js");

describe("evaluate function", () => {
  it("23+5=28", () => {
    expect(calculate("23+5", operators)).toBe(23 + 5);
  });
  it("(13+4)*2=34", () => {
    expect(calculate("(13+4)*2", operators)).toBe((13 + 4) * 2);
  });
  it("(1+3)) -> Error", () => {
    expect(() => calculate("(1+3))", operators)).toThrow();
  });
  it("(1+3 -> Error", () => {
    expect(() => calculate("(1+3", operators)).toThrow();
  });
});
