var mongoose = require ("mongoose")



var Todo = mongoose.model("Todo",{
    text: {
        type: String,
        required: true,
        minlength: 1,
        //trim the white space from the text 
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    
    completedAt: {
        type: Number,
        default: null
    },
    _creator :{
        type: mongoose.Schema.Types.ObjectId, 
        required: true
        
    }
    
    
    
})


module.exports ={Todo}