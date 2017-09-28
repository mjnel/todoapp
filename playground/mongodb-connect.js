


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

// db.collection(`Todos`).insertOne({
//   text: `something to do`,
//   completed: false
//
// }, (err, res)=>{
//   if (err){
//     return console.log(`unable to insert to do`, err)
//   }
//
// //.ops will return all docs inserted so one document
// console.log(JSON.stringify(res.ops, undefined, 2));
//
// })


//insert ne doc into users collection, (name age location)


// db.collection(`Users`).insertOne({
//   name: `Mark N`,
//   age: `26`,
//   location: `London`
// }, (err, res)=>{
//
//     if (err){
//       return console.log(`unable to insert to do`, err)
//     }
//
//   //.ops will return all docs inserted so one document
//   // console.log(JSON.stringify(res.ops[0]._id.getTimeStamp(), undefined, 2));
//   console.log(res.ops[0]._id.getTimestamp());
//
//
//
//
// })


db.close();

});
