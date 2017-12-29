require(`./config/config.js`);

const express = require("express");
const bodyParser = require ("body-parser")
const _ = require("lodash") 

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
      
       Todo.findByIdAndRemove(id).then((todo)=>{
         if(!todo){
           console.log("the ID you are requesting with is not in the DB")
          return res.status(404).send({})
         }
        res.status(200).send({todo})
       }).catch((e)=>{
         console.log(e)
         res.status(400).send({})
       })  
  })
  
  
  
app.patch(`/todos/:id`, (req,res)=>{
  var id = req.params.id
  
  // pick = takes an object and takes an array of properties 
  //subset of the things the user passed to us - we don't want the user to update anything they choose 
  var body = _.pick(req.body, [`text`, `completed`])
     
      if(!isValidID(id)){
      console.log("The ID you are requesting with is invalid")
      return res.status(404).send({})}
     
      if(_.isBoolean(body.completed)&&body.completed){
         body.completedAt= new Date().getTime();
     }else{
      body.completed = false; 
      body.completedAt = null; 
     }
     
     // $set means set the id which is found by the findbyidandupsdate 
     //new returns the newly updated document
     Todo.findByIdAndUpdate(id,{$set: body}, {new: true}).then((updatedToDo)=>{
      if(!updatedToDo){
          return res.status(404).send({})
      }
      res.send({updatedToDo})
     }).catch((e)=>{
      console.log(e)
      res.status(400).send({});
     })
})
  
//*******************************************************



app.post(`/users`, (req,res)=>{
    var body = _.pick(req.body, [`email`, `password`]);
    
    var user = new User(body)
    
    user.save().then(()=>{
        return user.generateAuthToken();
    }).then((token)=>{
      res.header(`x-auth`, token).send(user)  
    }).catch((e)=>{
        res.status(400).send(e)
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
    console.log("Server up!");
})


module.exports ={app}
