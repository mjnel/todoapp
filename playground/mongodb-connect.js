
//const MongoClient = require("mongodb").MongoClient;
// no need to pull off the .mongoclient call
// ObjectID constructor function allows us to make nww object UD's on the fly
const {MongoClient, ObjectID} = require("mongodb");


MongoClient.connect(`mongodb://localhost:27017/ToDoApp`, (err, db)=>{

if(err){
return console.log(err);
}
console.log(`connected to mongodb`)


var userCollection = db.collection('user')

// userCollection.insertOne({
//   email: "cup@mark.com"
// }).then((res)=>{
//     console.log(res)
//   }).catch((e)=>{console.log(e)})

userCollection.findOne({email: "keri_nelson@live.co.uk"
}).then((res)=>{
  console.log(res)
})


db.close();

});
