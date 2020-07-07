function isValidName(name) {
  return /^[0-9A-zÀ-ú ]+$/gm.test(name);
}

function calcAge(date) {
  return Math.abs(new Date(Date.now() - date).getFullYear() - 1970);
}

function executeSequentially(promises) {
  return new Promise((resolve, reject) => {
    const responses = [];
    return promises
      .reduce((p, x) => {
        return p.then(response => {
          if (response) responses.push(response);
          return x();
        });
      }, Promise.resolve())
      .then(lastResponse => {
        if (lastResponse) responses.push(lastResponse);
        return resolve(responses);
      })
      .catch(reject);
  });
}

module.exports = {
  isValidName,
  calcAge,
  executeSequentially
};
