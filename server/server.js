const mongoose = require("mongoose");


mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/ToDoApp");

var Todo = mongoose.model("Todo",{
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    
    completed: {
        type: Number
    }
})


var otherToDo = new Todo ({
    
    text: "this is a test",
    completed: false,
     
})

otherToDo.save().then((savedDoc)=>{
    console.log(`saved todo`, savedDoc);
    }).catch((e)=>{
    console.log(`ERROR!`, e)
  
})