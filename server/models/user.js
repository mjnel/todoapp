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
},
{
  usePushEach: true

}
)



//instance method - per document + no arrow to bind this
// this = individual document
UserSchema.methods.generateAuthToken = function (){
var access = "auth";
var token = jwt.sign({_id: this._id.toHexString(), access}, process.env.JWT_Secret).toString();
// new
// this.tokens.concat({access, token})
this.tokens.push({access, token});




return this.save().then(()=>{
    return token
})
}

UserSchema.methods.removeToken = function (token){
    var user = this;

//$pull -mongodb operator lets you pull items from an array which meet certin criteria
// pulling any token object in the tokens array which has the same token as the one passed in - entire object
   return user.update({
        $pull :{
            tokens: {token}

        }
    })

}





// Model Method
// this - Model as the this binding
UserSchema.statics.findByToken = function(token){
   var User =  this;
   var decoded;
 //allows code to be ran in the try block, if any errors, then run the catch code and contintue
   try {
      decoded = jwt.verify(token, process.env.JWT_Secret);

   }   catch(e){

       return Promise.reject();

   }

// reason why we are searching on more than one is if a user has more than one token

    return User.findOne({
        _id: decoded._id,
        'tokens.access': "auth",
        'tokens.token': token

    });
}

//this = model
UserSchema.statics.findByCredentials = function(email, password){
    var User = this;

           return User.findOne({email}).then((user)=>{
               if (!user){
                   return Promise.reject()
               }

               return new Promise((resolve, reject)=>{
                bcrypt.compare(password, user.password,(err, response)=>{
                    if(!response){
                    return reject(err)
                    }
                    return resolve(user)
                })
               })
           })













}





//findbyCred
//take email and pass as args and return promise /err






// Overriding method that dertermines what get sent back when a mongoose model is converted into JSON
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
