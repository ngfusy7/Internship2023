import getErrorMessage from "./snapshot";

describe("getErrorMessage", () => {
  it("returns an error for a valid code", () => {
    expect(getErrorMessage(1)).toMatchSnapshot();
    expect(getErrorMessage(2)).toMatchSnapshot();
    expect(getErrorMessage(3)).toMatchSnapshot();
  });

  it("throws an error otherwise", () => {
    expect(() => getErrorMessage(4)).toThrowErrorMatchingSnapshot();
  });
});