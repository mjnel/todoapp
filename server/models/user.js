const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs")


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



//instance method - per document + no arrow to bind this 
// this = individual document
UserSchema.methods.generateAuthToken = function (){
var access = "auth";
var token = jwt.sign({_id: this._id.toHexString(), access}, `abc123`).toString();
this.tokens.push({access, token});

return this.save().then(()=>{
    return token
})
}
   
// Model Method
// this - Model as the this binding
UserSchema.statics.findByToken = function(token){
   var User =  this;
   var decoded;
 
 //allows code to be ran in the try block, if any errors, then run the catch code and contintue
   try {
      decoded = jwt.verify(token, `abc123`);
      
   }   catch(e){
       
       return Promise.reject();

       
   }

// reason why we are searching on more than one is if a user has more than one token

    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': "auth"
    });


}

   

// Overriding method that dertermines what get sent back when a ongoose model is converted into JSON 
UserSchema.methods.toJSON = function(){
   var user = this;
   var userObject = user.toObject();
   return _.pick(userObject, ['_id', 'email']); 
}


// mongoose middleware - before the save function
UserSchema.pre('save', function(next){
    var user = this;
    if(user.isModified('password')){
    bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(user.password, salt, (err, hash)=>{
        user.password = hash;
        next();
    
    })
})

    }else{
        next();
    }
})




var User = mongoose.model("User", UserSchema)


module.exports ={User}