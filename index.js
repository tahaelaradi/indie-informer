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
  console.log(`search: ${req.body.search}`);
  Promise.all([fetchFromSteamSpy(req.body.search)])
    .then(games => fetchedDataPerGame(games))
    .then(result => {
      let data = deconstructGameData(result);
      let scaledData = generateScaledData(data);
      res.send(JSON.stringify(scaledData));
    });
});

app.listen(port, function() {
  console.log("Server is running on " + port + " port");
});

//

const sampleRate = 10;

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

function fetchedDataPerGame(games) {
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

function deconstructGameData(games) {
  let maxSales = 0;
  let gamesData = Object.values(games).map(game => {
    let min = parseInt(game["owners"].split(" ")[0].replace(/,/g, ""));
    let max = parseInt(game["owners"].split(" ")[2].replace(/,/g, ""));

    if (max > maxSales) {
      maxSales = max;
    }

    let tags = Object.keys(game["tags"])
      .sort(function(a, b) {
        return game["tags"][b] - game["tags"][a];
      })
      .slice(0, 5);

    return {
      id: game.appid,
      price: game["price"] / 100,
      copies: (min + max) / 2,
      tags: tags
    };
  });

  return { gamesData, maxSales: maxSales };
}

function generateScaledData(input) {
  let x = input.gamesData.map(game => {
    let gameTags = game["tags"].tagsSpecifier();
    return gameTags;
  });

  let y = input.gamesData
    .map(game => {
      return game.copies;
    })
    .scaleBetween(0, 1)
    .map(num => [num]);

  return { x, y, maxSales: input.maxSales };
}

Array.prototype.scaleBetween = function(scaledMin, scaledMax) {
  var max = Math.max.apply(Math, this);
  var min = Math.min.apply(Math, this);

  return max == min
    ? this.map(num => 1)
    : this.map(
        num => ((scaledMax - scaledMin) * (num - min)) / (max - min) + scaledMin
      );
};

Array.prototype.tagsSpecifier = function() {
  let res = tags.map(tag => {
    if (this.includes(tag)) return 1;
    else return 0;
  });
  return res;
};

const tags = ["Indie", "Action", "Adventure", "Casual", "Singleplayer", "Strategy", "Simulation",
        "RPG", "Multiplayer", "Great Soundtrack", "Atmospheric", "2D", "Puzzle", "Early Access",
        "Open World", "Story Rich", "Co-op", "Difficult", "Shooter", "Sci-fi", "First-Person",
        "Horror", "Anime", "Pixel Graphics", "VR", "Funny", "Platfromer", "Fantasy", "Free to Play",
        "Female Protagonist", "FPS", "Gore", "Survival", "Violent", "Sandbox", "Retro", "Arcade",
        "Comedy", "Classic", "Nudity", "Third Person", "Massively Multiplayer", "Exploration", "Point & Click",
        "Visual Novel", "Turn-Based", "Space", "Sports", "Rogue-like", "Racing"
        ]
