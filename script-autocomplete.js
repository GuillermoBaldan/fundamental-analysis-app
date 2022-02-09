const http = require("https");
const config = require("./.env/config.js");

let q = "tesla";
let region = "US";
const options = {
  method: "GET",
  hostname: "yh-finance.p.rapidapi.com",
  port: null,
  path: `/auto-complete?q=${q}&region=${region}`,
  headers: {
    "x-rapidapi-host": "yh-finance.p.rapidapi.com",
    "x-rapidapi-key": config.TOKEN_API_ENV,
    useQueryString: true,
  },
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();

console.log(req.body);
