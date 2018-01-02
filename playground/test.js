const validator = require("validator");



var testEmail = (email)=>{
  return validator.isEmail(email)
}


console.log(testEmail("mark@nelson.com"
))