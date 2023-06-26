const express = require("express");
const request = require("request");

const app = express();

const accountKey = "FbQwubspQs+LjagFP5qsUA==";

const desiredURL = "http://datamall2.mytransport.sg/ltaodataservice/TrainServiceAlerts";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

const requestOptions = {
  url: desiredURL,
  method: "GET",
  json: {},
  headers: {
    AccountKey: accountKey,
  },
};

app.get("/servicealerts", (req, res) => {
  request(requestOptions, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      res.status(response.statusCode).json({ type: "error", message: "" });
    } else {
      res.send(body);
    }

    // res.json(JSON.parse(body));
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
