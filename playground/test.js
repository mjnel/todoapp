
var mongoose = require("mongoose");
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/ToDoApp');



var User = mongoose.model("User",{
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
})



User.findById("5a354fbbb28094000b4253ee").then((res)=>{
      console.log(res); 
}).catch((e)=>{
    console.log(e);
})



// var dogUser = new User({
//   email: 'test@bear.com'
// });



// dogUser.save((err, results) => {
//   console.log(results);
// });






// console.log(User)

// User.findById("5a35444b0dcf847beb029df6").then((res)=>{
//   console.log(res); 
// }).catch((e)=>{
//     console.log(e);
// })