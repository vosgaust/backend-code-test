import GeniallyCounter from "../../../../../src/contexts/core/geniallyCounter/domain/GeniallyCounter";

describe("GeniallyCounter", () => {
  it("should create a counter without init value", () => {
    const counter = new GeniallyCounter();
    expect(counter.count).toBe(0);
  });

  it("should create a counter with init value", () => {
    const counter = new GeniallyCounter(5);
    expect(counter.count).toBe(5);
  });

  it("should increase the counter properly", () => {
    const counter = new GeniallyCounter();
    const count = counter.count;
    counter.increase();
    expect(counter.count).toBe(count + 1);
  });
});