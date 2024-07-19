import hello from "../src/hello.js";

describe("Test", () => {
  test("Hello world", () => {
    expect(hello()).toBe("Hello World!");
  });
});
