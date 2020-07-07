function isValidName(name) {
  return /^[0-9A-zÀ-ú ]+$/gm.test(name);
}

function calcAge(date) {
  return Math.abs(new Date(Date.now() - date).getFullYear() - 1970);
}

async function executeSequentially(promises) {
  const responses = []

  for await (const promise of promises) {
    responses.push(await promise())
  }

  return responses
}

module.exports = {
  isValidName,
  calcAge,
  executeSequentially
};
