const {mongoose} = require(`./../server/db/mongoose`);
const {Todo} = require (`./../server/models/todo`);
const {User} = require (`./../server/models/user`);


//remove all
// Todo.remove({}).then((result)=>{
//     console.log(result)
// })


// returns document too
Todo.findOneAndRemove({"_id":"5a3aa6698bb08406bbcf1d7c"}).then((res)=>{
    console.log(res); 
})
 
 
 Todo.findByIdAndRemove(`5a3aa6698bb08406bbcf1d7b`).then((res)=>{
     console.log(res)
 }) 

//endpoint
//https://todoapp-mjnelson.c9users.io/todos
