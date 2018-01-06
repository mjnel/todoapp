var {User}= require("./../models/user");



var authenticate = (req, res, next) =>{
    var token = req.header('x-auth');
    User.findByToken(token).then((user)=>{
       if(!user){ 
           // could res.status(401) return rejectyed promise so function stops and sends err case
         return Promise.reject();
    }
// setting req.user so that the next function will have access to it as its still in the request technically
       req.user=user;
       req.token = token;
       next();
    }).catch((e)=>{
        res.status(401).send();
        
    })
    
    
}
module.exports = authenticate


