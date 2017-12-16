const {mongoose} = require(`./../server/db/mongoose`);
const {Todo} = require (`./../server/models/todo`);
const {User} = require (`./../server/models/user`);




User.findById("5a354fbbb28094000b4253ee").then((res)=>{
      console.log(res); 
}).catch((e)=>{
    console.log(e);
})


// Todo.findById(id).then((todo)=>{
//     if(!todo){
//     return console.log("incorrect!")    
//     }
    
//     console.log(todo)
// }).catch((error)=>{
//     console.log(error)
// })




// User.find({
//     // email: "keri_nelson@live.co.uk"
// }).then((res)=>{
//     console.log(res);
// })

// Todo.findOne({
//     _id: id
// }).then((todo)=>{
//     console.log(`todos:`, todo)
// })





// incorrect ID
// var id = '5a2ec681cdde9f1ad5a5ae6411';





// if(!ObjectID.isValid(id)){
//     console.log("ID not valid!")
// }



// Todo.find({
//     _id: id
// }).then((todo)=>{
//     console.log(`todos:`, todo)
// })

// Todo.findOne({
//     _id: id
// }).then((singleToDo)=>{
//     console.log(`todo`, singleToDo);
// })

// Todo.findById(id).then((todo)=>{
//     if(!todo){
//     return console.log("incorrect!")    
//     }
    
//     console.log(todo)
// }).catch((error)=>{
//     console.log(error)
// })

// User.findById("5a33fe8ec4c1610b20c0cbb4").then((res)=>{
//     if(!res){
//         return console.log("user not found")
//     }
//       console.log(res); 
// }).catch((e)=>{
//     console.log(e);
// })



//endpoint
//https://todoapp-mjnelson.c9users.io/todos
