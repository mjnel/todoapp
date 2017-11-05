var express = require("express");
var bodyParser = require ("body-parser")

// object destructing - creating a local variable from the mongoose property on the object 
var {mongoose}= require("./db/mongoose");
var {Todo}= require("./models/todo");
var {User}= require("./models/user");

var app = express();

//body parser takes JSON and converts to JavaScript. 
//app.use = middleware. 
app.use(bodyParser.json())
// return value is a function which is given back to express. Send JSON to express. 


app.post(`/todos`, (req,res)=>{
    console.log(req.body)
    
});




app.listen(3000, ()=>{
    console.log(`up on port 3000`)
})
