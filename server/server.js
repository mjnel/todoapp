const express = require("express");
const bodyParser = require ("body-parser")

// object destructing - creating a local variable from the mongoose property on the object
var {mongoose}= require("./db/mongoose");
var {Todo}= require("./models/todo");
var {User}= require("./models/user");
const {ObjectID} = require("mongodb");


var app = express();

//body parser takes JSON and converts to JavaScript.
//app.use = middleware.
app.use(bodyParser.json())
// return value is a function which is given back to express. Send JSON to express.


app.post(`/todos`, (req,res)=>{
    var todo = new Todo({
		text : req.body.text
	})

  todo.save().then((doc)=>{
    res.send(doc)
  }).catch((e)=>{
    res.status(400).send(e)
  })
});


app.get(`/todos`, (req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos})
  }).catch((e)=>{
    res.status(400).send(e)
  })
})


app.get(`/todos/:id`, (req, res)=>{
  var id = req.params.id
  if(!isValidID(id)){
    console.log("The ID you are requesting with is invalid")
    return res.status(404).send({})
    }
    
      Todo.findById(id).then((todo)=>{
        if(!todo){
          console.log("the ID you are requesting with is not in the DB")
         return  res.status(404).send({})
        }
        res.status(200).send(todo)
        }).catch((e)=>{
        res.status(404).send({})
      })
    })
  
  
  app.delete(`/todos/:id`, (req, res)=>{
    var id = req.params.id
    if(!isValidID(id)){
      console.log("The ID you are requesting with is invalid")
     return res.status(404).send({})}
      
       Todo.findByIdAndRemove(id).then((removedTodo)=>{
         if(!removedTodo){
           console.log("the ID you are requesting with is not in the DB")
          return res.status(404).send({})
         }
        res.status(200).send(removedTodo)
       }).catch((e)=>{
         console.log(e)
         res.status(400).send({})
       })  
        
      
  })
  
  
  








//FUNCTIONS

let isValidID = (id)=> {  
    if (!ObjectID.isValid(id)){
      return (false)
    }else{
     return (true)
    }
}



  




app.listen (process.env.PORT, process.env.IP, function (){
    console.log("server started");
})


module.exports ={app}
