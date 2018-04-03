require(`./config/config.js`);

const express = require("express");
const bodyParser = require ("body-parser")
const _ = require("lodash");
const bcrypt = require("bcryptjs")



// object destructing - creating a local variable from the mongoose property on the object
var {mongoose}= require("./db/mongoose");
var {Todo}= require("./models/todo");
var {User}= require("./models/user");
const {ObjectID} = require("mongodb");
const authenticate = require('./middleware/auth');


var app = express();

//body parser takes JSON and converts to JavaScript.
//app.use = middleware.
app.use(bodyParser.json())
// return value is a function which is given back to express. Send JSON to express.




app.post(`/users`, async (req,res)=>{
  try{
    var body = _.pick(req.body, [`email`, `password`]);
    var userInstance = new User(body);
    await userInstance.save();
    const token = await userInstance.generateAuthToken();
    res.header(`x-auth`, token).send(userInstance)
  }catch(e){
res.status(400).send(e)
  }
})


app.post(`/todos`,authenticate, async (req,res)=>{
  try{
    let todo = new Todo({
		text : req.body.text,
		_creator: req.user._id
	})
  const savedToDo = await todo.save()
  res.status(200).send(savedToDo)
  }catch(e){
  res.status(400).send(e)
  }

});


// https://www.udemy.com/the-complete-nodejs-developer-course-2/learn/v4/t/lecture/5795032?start=0
//07:22


app.get(`/todos`,authenticate, async (req,res)=>{
  try{
    let foundToDo = await Todo.find({
        _creator: req.user._id
    })
    res.status(200).send(foundToDo)

  }catch(e){
    res.status(400).send(e)
  }

})





app.get(`/todos/:id`, authenticate, async (req, res)=>{
  var id = req.params.id
  if(!isValidID(id)){
    console.log("The ID you are requesting with is invalid")
    return res.status(404).send({})
    }

  try{
    const gottenToDo = await Todo.findOne({
         _creator: req.user._id,
         _id: id
      })
  if(!gottenToDo){
    console.log("the ID you are requesting with is not in the DB");
    return res.status(404).send({})
  }
  res.status(200).send(gottenToDo)
  }catch(e){
    res.status(404).send({})
  }

    })



  app.delete(`/todos/:id`, authenticate, async (req, res)=>{
    var id = req.params.id
    if(!isValidID(id)){
      console.log("The ID you are requesting with is invalid")
     return res.status(404).send({})}

     try {
       const todo = await Todo.findOneAndRemove({
         _creator: req.user._id,
        _id: id
           })
           if(!todo){
             console.log("the ID you are requesting with is not in the DB")
            return res.status(404).send({})
               }
               res.status(200).send({todo})
             }catch(e){
               res.status(400).send({})


             }

  })










app.patch(`/todos/:id`, authenticate, async (req,res)=>{
  var id = req.params.id
  // pick = takes an object and takes an array of properties
  //subset of the things the user passed to us - we don't want the user to update anything they choose
  var body = _.pick(req.body, [`text`, `completed`])

      if(!isValidID(id)){
      console.log("The ID you are requesting with is invalid")
      return res.status(404).send({})}

      if(_.isBoolean(body.completed) && body.completed){
         body.completedAt= new Date().getTime();
     }else{
      body.completed = false;
      body.completedAt = null;
     }

     // $set means set the id which is found by the findbyidandupsdate
     //new returns the newly updated document
     const todo = await Todo.findOneAndUpdate({_id: id, _creator: req.user._id},{$set: body}, {new: true})
     if(!todo){
         return res.status(404).send({})
     }
     res.send(todo)
})



//*******************************************************







app.get(`/users/me`, authenticate, (req, res)=>{
    res.send(req.user)
})


// app.post(`/users/login`, (req,res)=>{
//     var body = _.pick(req.body, [`email`, `password`]);
//    User.findByCredentials(body.email,body.password).then((user)=>{
//     //   console.log(user)
//         return user.generateAuthToken().then((token)=>{
//             res.header(`x-auth`, token).send(user)
//         })
//    }).catch((e)=>{
//        res.status(400).send({})
//    })
//
//
// })

app.post(`/users/login`, async (req,res)=>{
  try{
    var body = _.pick(req.body, [`email`, `password`]);
    const user = await User.findByCredentials(body.email,body.password)
    const token = await user.generateAuthToken()
    res.header(`x-auth`, token).send(user)
  }catch(e){
    res.status(400).send({})
  }



})




// app.delete(`/users/me/token`, authenticate, (req,res) =>{
//     //instance method
//     req.user.removeToken(req.token).then(()=>{
//         res.status(200).send()
//     }).catch(()=>{
//         res.status(400).send()
//     })
//
// })


app.delete(`/users/me/token`, authenticate, async (req,res) =>{
    try{
      await req.user.removeToken(req.token)
      res.status(200).send()

    }catch(e){
      res.status(400).send()


    }

})














//FUNCTIONS

let isValidID = (id)=> {
    if (!ObjectID.isValid(id)){
      return (false)
    }else{
     return (true)
    }
}





app.listen(3000, () => console.log('App listening on 3000.'));



module.exports ={app}
