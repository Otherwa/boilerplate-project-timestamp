// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get('/api/:date', function(req, res){
  // creating a date object
  var date = new Date();
  let date_string = "";
  // if the given parameter is a number (timestamp)
  if((req.params.date)){
    date_string = date.setTime(req.params.date);
  } 
  // else we just create a new date parsing the string given
  else {
    date = new Date(req.params.date);
  }
  
  // giving headers for JSON
  res.set({ 'Content-Type': 'application/json' }) 
  // if the date is invalid
  if(!date.getTime()) res.send({error: "Invalid date given"})
  // else, we send the object with two members (unix and natural)
  else res.send({
    "unix": req.params.date,
    "utc": new Date(date_string).toUTCString()
  })
})


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
