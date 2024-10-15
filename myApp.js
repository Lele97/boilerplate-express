var bodyParser = require('body-parser');
let express = require('express');
require('dotenv').config();
const res = require('express/lib/response');
let app = express();

var message;

app.use('/public', express.static(__dirname+'/public'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(function middleware(req,res,next){
    console.log(req.method +" "+ req.path + " - " + req.ip)
    next()
})

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/views/index.html");
});

app.get("/json", (req, res) => {
    if (process.env.MESSAGE_STYLE === "uppercase") {
        message = "Hello json".toUpperCase();
      } else {
        message = "Hello json";
      }
        res.json({"message":message});
});

app.get("/:word/echo", (req,res)=>{
  const word =  req.params.word;
  res.json({
    "echo":word
  });
})

/* app.get("/name" ,(req,res)=>{
  var  {frist = frist, last= last}=req.query;
  res.json({
    "name" : frist + " " + last
  });
}) */

app.get("/name", function(req, res) {
  // OR you can destructure and rename the keys
  var { first: firstName, last: lastName } = req.query;
  // Use template literals to form a formatted string
  res.json({
    name: `${firstName} ${lastName}`
  });
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time
    });
  }
);

 module.exports = app;
