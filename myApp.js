let express = require('express');
require('dotenv').config();
const res = require('express/lib/response');
let app = express();

var message;

app.use('/public', express.static(__dirname+'/public'))

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

 module.exports = app;
