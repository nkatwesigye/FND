// Setup empty JS object to act as endpoint for all routes
projectData = {};
var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
var app = express();
var port = 8000

// Start up an instance of app
app.listen(port,() => {
    console.log(`Example app listening at http://localhost:${port}`)
  });
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
 app.get('/projectData', (req, res) => {
  // Send projectData as response
     res.status(200).send(projectData);
 });

app.post('/postprojectData',(req, res) => {
 // res.status(200).send(req.body);
  projectData = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.feeling
  };
  console.log(projectData);
  res.status(200).send({
    sucess: true,
    message: "Data saved successfully",
    data: projectData
  });



});