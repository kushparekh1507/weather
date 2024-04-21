const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = new express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
  // console.log(req.body.city);
  const city = req.body.city;
  const apiKey = "56800e7c57fe7b4c552bda52f110fbce";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + units;

  https.get(url, function (response) {
    // console.log(response);
    // console.log(response.statusCode);
    response.on("data", function (d) {
      const weatherData = JSON.parse(d);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      console.log(temp);
      console.log(description);
      res.write("<h1>The temperature in " + city + " is " + temp + " degree celcious</h1>");
      res.write("<h2>The waether in " + city + " is currently " + description + "</h2>");
      res.write(`<img src=http://openweathermap.org/img/wn/${icon}@2x.png>`)
      res.send();
    })
  })
})


app.listen(3000, function () {
  console.log("server is running at port number 3000");
})