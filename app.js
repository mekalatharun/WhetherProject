const express = require("express");
const https = require("https");
const bodyParser=require("body-parser");
const app = express(); // initialize express
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req, res) {
  res.sendFile(__dirname+"/index.html");
  });
  app.post("/",function(req,res){

   const query=req.body.city;
   const apiKey="ecb3ca1afba9d3769acf3203f88a8fc9";
   const units="metric";
   const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+units+"&appid="+apiKey;
   https.get(url, function(response) {
     console.log(response.statusCode);
     response.on("data", function(data) {
       //console.log(data); it provides hexadecimal codes
       const weatherData = JSON.parse(data);
       // console.log(weatherData);
       const temp = weatherData.main.temp;
       console.log(temp);
       const weather=weatherData.weather[0].description;
       console.log(weather);
       const icon=weatherData.weather[0].icon;
       const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
       res.write("<p>The weather is currently "+weather+"</p>");
       res.write("<h1>The temparature in "+query+" is "+temp+" degrees Celcius </h1>");
       res.write("<img src ="+imageURL+">");
       res.send();//can only send send() methood once
     });
   // const object={
   //   name:"Gowtham",
   //   game:"Cricket"
   // }
   // console.log(JSON.stringify(object));
   // res.send("Server is up and running"); u can only send send() methood once
   // });
 });
  });











app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
