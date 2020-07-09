const http = require('http')
const https = require('https')

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

function request(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;

    const request = lib.get(url, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed with status code: ' + response.statusCode));
      }

      const body = [];
      response.on('data', (chunk) => body.push(chunk));

      response.on('end', () => resolve({
        statusCode: response.statusCode,
        statusMessage: response.statusMessage,
        data: JSON.parse(body.join(''))
      }));
    });

    request.on('error', (err) => reject(err))
  })
}

module.exports = {
  isValidName,
  calcAge,
  executeSequentially,
  request
};
