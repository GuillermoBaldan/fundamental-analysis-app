const http = require("https");
const config = require("./.env/config.js");
const fs = require("fs");

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

function call(req) {
  //open a json file
  let file = fs.readFileSync("./.env/counting-api-calls.json");
  let data = JSON.parse(file);
  let date = new Date();
  data.push({ date: date, count: 1 });
  /*   if (req.end().body != undefined) {
    data = JSON.stringify(data);
    fs.writeFile("./.env/counting-api-calls.json", data, function (err) {
      if (err) throw err;
    });
  } */
  req.end(function () {
    data = JSON.stringify(data);
    fs.writeFile("./.env/counting-api-calls.json", data, function (err) {
      if (err) throw err;
    });
  });

  return req.body;
}

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

//req.end();

console.log(call(req));
