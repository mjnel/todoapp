


//const MongoClient = require("mongodb").MongoClient;
// no need to pull off the .mongoclient call
// ObjectID constructor function allows us to make nww object UD's on the fly
const {MongoClient, ObjectID} = require("mongodb");

// new instacne of ObjectID
var obj = new ObjectID();
console.log(obj.getTimestamp());



MongoClient.connect(`mongodb://localhost:27017/ToDoApp`, (err, db)=>{

if(err){
return console.log(err);
}
console.log(`connected to mongodb`)

// retuns a curor - pointer to the documents
db.collection(`Todos`).find({_id:
  new ObjectID(`59c11cbe3f70763a88bb2a5d`)
}).toArray().then((arr)=>{
console.log(JSON.stringify(arr,undefined,2));

}).catch((e)=>{
  console.log(e);
})




// db.close();

});
