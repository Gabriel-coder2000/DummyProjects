// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us1.api.mailchimp.com/3.0/lists/636af200a3";
  const options = {
    method: "POST",
    auth: "Gabriel1:96186da40b71d5bb1be5de4635c6fd37-us1"
  };

  const request = https.request(url, options, function(response) {

if(response.statusCode === 200){
  res.sendFile(__dirname + "/success.html");
}else{
  res.sendFile(__dirname + "/Failure.html");
}


    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });

  });

  request.write(jsonData);
  request.end();

});

app.post("/Failure", function(req, res){
  res.redirect("/");
});


app.listen(process.env.PORT ||3000, function() {

  console.log("Server running on Port 3000");
});
// API KEY
// 96186da40b71d5bb1be5de4635c6fd37-us1
// List // ID
// 636af200a3
