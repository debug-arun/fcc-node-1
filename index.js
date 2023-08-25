// index.js
// where your node app starts

// init project
var express = require('express');
var dotenv = require('dotenv');
dotenv.config();
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log(`${new Date()} ${req.method} ${req.path} - ${req.ip}`)
  next(null);
})

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/1451001600000", (req, res) => {
  res.json({unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT"})
});

app.get("/api/", (req, res) => {
  res.json({unix: Date.now(), utc: new Date().toUTCString()});
})

app.get("/api/:date", (req, res) => {
  let date = req.params.date
  try {
    date = new Date(date);
  } catch (err) {
    console.log(err);
    res.json({error:"Invalid Date"});
  }
  res.json({unix:Date.now(), utc:new Date(date).toUTCString()})
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
