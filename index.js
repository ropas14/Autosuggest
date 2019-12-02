var express = require('express');
let app = express();
const path = require('path');
let tvJson = require("./Televisions.json")
var bodyParser = require("body-parser");

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000, () => {
 console.log("Server running on port 3000");
});


app.get("/",(req,res,next)=>{
  res.json(tvJson);
})

app.get("/home",(req,res,next)=>{
	res.sendFile(path.join(__dirname, './home.html'))
})

app.get("/retailer/:name",(req,res,next)=>{
  
  let commonRetailers = []

  tvJson.forEach((item)=>{
  	if(item["Retailer Name"]==req.params.name){
          commonRetailers.push(item);
  	}
  })  

  res.json(commonRetailers);

})