var env = process.env.NODE_ENV || `development`;

if(env ===`development` || env ===`test`){
    //using a JSON file as this is where the secret values are 
    var config = require('./config.json');
    // getting the right object as per the env. Using a var to access a property
    var envConfig = config[env];
    
    Object.keys(envConfig).forEach((key)=>{
      console.log(key)
      //process.env 
      // using the object from the global scope (envConfig) to get properties off
      process.env[key] = envConfig[key]
      console.log(envConfig[key])
  
    })
        
    
    
}


console.log(`env ********`, env);
