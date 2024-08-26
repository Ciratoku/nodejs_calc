const calculate = require("../calc");

describe("evaluate function", () => {
  it("23+5=28", () => {
    expect(calculate("23+5")).toBe(23 + 5);
  });
  it("(13+4)*2=34", () => {
    expect(calculate("(13+4)*2")).toBe((13 + 4) * 2);
  });
  it("(1+3)) -> Error", () => {
    expect(() => calculate("(1+3))")).toThrow();
  });
  it("(1+3 -> Error", () => {
    expect(() => calculate("(1+3")).toThrow();
  });
});
