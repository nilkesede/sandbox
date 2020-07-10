const { isValidName, calcAge, executeSequentially, request } = require("./index");

function asyncTimeout(delay) {
  return () =>
    new Promise(resolve => {
      setTimeout(() => resolve(delay), delay);
    });
}

describe("Name validation", () => {
  it("Should be a valid name", () => {
    expect(isValidName("Nil Késede")).toBeTruthy();
    expect(isValidName("Nil Késede Tçãè1312")).toBeTruthy();
  });

  it("Should not be a valid name", () => {
    expect(isValidName("Nil ~/ Késede")).toBeFalsy();
    expect(isValidName("Nil Késede LTDA.")).toBeFalsy();
  });
});

describe("Age calculator", () => {
  it("Should show the rigth age", () => {
    const age = new Date().getFullYear() - 1994;
    expect(calcAge(new Date("1994"))).toEqual(age);
  });
});

describe("Execute Promises Sequentially", () => {
  it("Should execute in the rigth order", () => {
    expect.assertions(1);

    const times = [10, 20, 30];
    const promises = times.map(asyncTimeout);

    return expect(executeSequentially(promises)).resolves.toEqual(times);
  });
});

describe("Make a HTTP Request", () => {
  it("Should execute the request to API", () => {
    const url = 'https://jsonplaceholder.typicode.com/todos/1'
    const options = {
      method: 'get'
    }
    return expect(request(url, options)).resolves.toEqual({
      data: {
        completed: false,
        id: 1,
        title: "delectus aut autem",
        userId: 1
      },
      statusCode: 200,
      statusMessage: "OK"
    });
  });
});
