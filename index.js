const http = require("http");
const https = require("https");

function isValidName(name) {
  return /^[0-9A-zÀ-ú ]+$/gm.test(name);
}

function calcAge(date) {
  return Math.abs(new Date(Date.now() - date).getFullYear() - 1970);
}

async function executeSequentially(promises) {
  const responses = [];

  for await (const promise of promises) {
    responses.push(await promise());
  }

  return responses;
}

function request(url, options, data) {
  return new Promise((resolve, reject) => {
    const json = JSON.stringify(data) || "";
    options.headers = {
      ...options.headers,
      "Content-Length": json.length
    };

    const library = url.startsWith("https") ? https : http;
    const request = library.request(url, options, response => {
      const body = [];
      response.on("data", chunk => body.push(chunk));
      response.on("end", () =>
        resolve({
          statusCode: response.statusCode,
          statusMessage: response.statusMessage,
          data: body.length > 0 ? JSON.parse(body.join()) : ""
        })
      );
    });

    request.write(json);
    request.on("error", reject);
    request.end();
  });
}

module.exports = {
  isValidName,
  calcAge,
  executeSequentially,
  request
};
