const bcrypt = require("bcryptjs")

var password = "123abc!";

// async num of srounds to generate salt 
// salt built into the hash value


// bcrypt.genSalt(10, (err, salt)=>{
//     console.log(salt);
//     bcrypt.hash(password, salt, (err, hash)=>{
//         console.log(hash);
//     })
// })

var hashedpass = "$2a$10$ab4Js/fcAyZ/ZXfqh8fx9.9hqZfnBlDiahSfXm5iR3EhFkNguRM0e"      


bcrypt.compare(password, hashedpass, (err, res)=>{
    console.log(res)
})








// const {SHA256} = require("crypto-js");

// var message = "I am user numbber 3"
// var hash = SHA256(message).toString();
    
// console.log(hash)


// var data = {
    
//     id: 4
    
// }

// hashing the ID with the secret (salting the data)
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + "somesecret").toString()
// }

// //man in the middle
// // not got access to the same salt 
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString(); 



// var resultHash = SHA256(JSON.stringify(token.data)+ "somesecret").toString()

// if(resultHash === token.hash){
//     console.log("not manipulated"); 
// }else{
//     console.log("manipulated");
// }

// const jwt = require("jsonwebtoken");

// sign takes the user object with the info and it signs it and creates hash and returns token value 
// jwt.sign 

// takes the token and the secret and makes sutre that the secret was not maniuplaued 
// jwt.veriry

// var data = {
//     id: "test"

// }
// //takes data you want to hash and the secret - returns a token 

// var token = jwt.sign(data, '123abc')
// console.log(token); 

// var decoded = jwt.verify(token, '123abc')
// console.log('decoded', decoded)
