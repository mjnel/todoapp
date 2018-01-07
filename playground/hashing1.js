const {MD5} = require("crypto-js");


var data = {
    id: 4
}


var token = {
    data,
    hash: MD5(JSON.stringify(data) + "somesecret").toString()
}

//man in the middle
// not got access to the same salt 
token.data.id = 5;
token.hash = MD5(JSON.stringify(token.data)).toString(); 



var resultHash = MD5(JSON.stringify(token.data)+ "somesecret").toString()

if(resultHash === token.hash){
    console.log("not manipulated"); 
}else{
    console.log("manipulated");
}

