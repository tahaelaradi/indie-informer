const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;

const bodyParser = require("body-parser");
const https = require("https");

app.use(cors());
app.use(express.json());

//

app.post("/search/", function(req, res) {
  console.log("test");
  Promise.all([fetchFromSteamSpy(req.body.search)])
    .then(games => deconstructFetchedData(games))
    .then(result => {
      res.send(JSON.stringify(result));
    });
});

app.listen(port, function() {
  console.log("Server is running on " + port + " port");
});

//

const sampleRate = 20;

function fetchFromSteamSpy(params) {
  return new Promise((resolve, reject) => {
    const url = `https://steamspy.com/api.php?request=genre&genre=${params}`;

    https.get(url, res => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", data => {
        body += data;
      });
      res.on("end", () => {
        body = JSON.parse(body);
        resolve(body);
      });
    });
  });
}

function deconstructFetchedData(games) {
  var result = {};
  return new Promise((resolve, reject) => {
    var index = 0;
    var interval = setInterval(function() {
      console.log(index);
      gz = Object.values(games[0]).slice(index, index + 4);

      let data = gz.map((game, j) => {
        const url = `https://steamspy.com/api.php?request=appdetails&appid=${
          game.appid
        }`;
        https.get(url, res => {
          res.setEncoding("utf8");
          let body = "";
          res.on("data", data => {
            body += data;
          });
          res.on("end", () => {
            if (IsJsonString(body)) {
              result[j] = JSON.parse(body);
            }
          });
        });
      });

      index += 2;
      if (index >= sampleRate) {
        clearInterval(interval);
        resolve(result);
      }
    }, 800);
  });
}

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
