import callBack from "./Example";
const call = new callBack()

describe('Example code', () => {
  beforeAll(() => {
    // console.log('beforeAll')
  });

  beforeEach(() => {
    // console.log('beforeEach')
  });

  afterEach(() => {
    // console.log('afterEach')
  });

  afterAll(() => {
    // console.log('afterAll')
  })

  test('adds 1 + 2 to equal 3 ', () => {
    expect(call.init(3)).toBe(6)
  })
  test("mock implementation", () => {
    const mock = jest.fn(() => "bar");
    // console.log('mock', mock)
    expect(mock("foo")).toBe("bar");
    // expect(mock).toHaveBeenCalledWith("foo");
  });
  
  test("also mock implementation", () => {
    const mock = jest.fn().mockImplementation(() => "bar");
  
    expect(mock("foo")).toBe("bar");
    expect(mock).toHaveBeenCalledWith("foo");
  });
  
  test("mock implementation one time", () => {
    const mock = jest.fn().mockImplementationOnce(() => "bar");
  
    expect(mock("foo")).toBe("bar");
    expect(mock).toHaveBeenCalledWith("foo");
  
    expect(mock("baz")).toBe(undefined);
    expect(mock).toHaveBeenCalledWith("baz");
  });
  
  test("mock return value", () => {
    const mock = jest.fn();
    mock.mockReturnValue("bar");
  
    expect(mock("foo")).toBe("bar");
    expect(mock).toHaveBeenCalledWith("foo");
  });
  
  test("mock promise resolution", () => {
    const mock = jest.fn();
    mock.mockResolvedValue("bar");
  
    expect(mock("foo")).resolves.toBe("bar");
    expect(mock).toHaveBeenCalledWith("foo");
  });
  

})
