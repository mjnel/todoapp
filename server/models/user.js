const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

//unique - property email does not have same email as any other documents in the collection 
// validator


var UserSchema  = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
            }
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        tokens : [{
            access: {
                type: String,
                required: true
                
            },
            token: {
                type: String,
                required: true
            }
        }]
})

//instance method - per document 
UserSchema.methods.generateAuthToken = function (){

var access = "auth";

var token = jwt.sign({_id: this._id.toHexString(), access}, `abc123`).toString();
this.tokens.push({access, token});
return this.save().then(()=>{
    return token
})
}
   

// Overriding method that dertermines what get sent back when a ongoose model is converted into JSON 
    
UserSchema.methods.toJSON = function(){
   var user = this;
   var userObject = user.toObject();
   
   
   return _.pick(userObject, ['_id', 'email']); 
   
   
}



var User = mongoose.model("User", UserSchema)


module.exports ={User}