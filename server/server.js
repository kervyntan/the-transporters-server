const express = require("express");
const request = require("request");

const app = express();

const accountKey = "FbQwubspQs+LjagFP5qsUA==";

const headers = {
  AccountKey: accountKey,
};

const desiredURLs = {
  serviceAlertURL:
    "http://datamall2.mytransport.sg/ltaodataservice/TrainServiceAlerts",
  carparkAvailabilityURL:
    "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2",
  platformCrowdURL:
  // query string vs params
    "http://datamall2.mytransport.sg/ltaodataservice/PCDRealTime?TrainLine=",
  crowdForecastURL: 
    "http://datamall2.mytransport.sg/ltaodataservice/PCDForecast?TrainLine="
};

// middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

const serviceAlert = {
  url: desiredURLs.serviceAlertURL,
  method: "GET",
  json: {},
  headers,
};

const carparkAvailability = {
  url: desiredURLs.carparkAvailabilityURL,
  method: "GET",
  json: {},
  headers,
};

const platformCrowd = {
  url: desiredURLs.platformCrowdURL,
  method: "GET",
  json: {},
  headers,
};

const crowdForecast = {
  url: desiredURLs.crowdForecastURL,
  method: "GET",
  json: {},
  headers
};

app.get("/servicealerts", (req, res) => {
  request(serviceAlert, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      res
        .status(response.statusCode)
        .json({ type: "error", message: "Refer to status returned by response to continue troubleshooting."});
    } else {
      res.send(body);
    }
  });
});

app.get("/carparkavailability", (req, res) => {
  request(carparkAvailability, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      res
        .status(response.statusCode)
        .json({ type: "error", message: "Refer to status returned by response to continue troubleshooting." });
    } else {
      res.send(body);
    }
  });
});

app.get("/platformcrowd", (req, res) => {
  if (req.query.TrainLine) {
    platformCrowd.url = desiredURLs.platformCrowdURL + req.query.TrainLine;
  } else {
    res
      .status(400)
      .json({
        type: "error",
        message: "Missing query string for train line.",
      });
  }
  request(platformCrowd, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      console.log(error)
      res.status(response.statusCode).json({ type: "error", message: "Refer to status returned by response to continue troubleshooting." });
    } else {
      res.send(body);
    }
  });
});

app.get("/crowdforecast", (req, res) => {
  if (req.query.TrainLine) {
    crowdForecast.url = desiredURLs.crowdForecastURL + req.query.TrainLine;
  } else {
    res
      .status(400)
      .json({
        type: "error",
        message: "Missing query string for train line.",
      });
  }
  request(crowdForecast, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      res.status(response.statusCode).json({ type: "error", message: "Refer to status returned by response to continue troubleshooting." });
    } else {
      res.send(body);
    }
  });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
