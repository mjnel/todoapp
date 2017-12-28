var env = process.env.NODE_ENV || `development`;

console.log(`env ********`, env);

if(env === `development`){
    process.env.MONGODB_URI = "mongodb://localhost:27017/ToDoApp"
    //set up mongodb url
}else if(env === `test`){
        process.env.MONGODB_URI = "mongodb://localhost:27017/ToDoAppTest"

    // set up mongo db url 
}