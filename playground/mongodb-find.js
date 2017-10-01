


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
// db.collection(`Todos`).insertMany([{text: "walk the dog", completed: "true"},{text: "say hello", completed: "false"}]).then(e)=>{


// db.collection(`Users`).insertMany([{name: "Lior", age: "26", location: "London"},{name: "Nelson", age: "25", location: "HH"},{name: "Arron", age: "59", location: "Lancs"}])
// .then((count)=>{
//   console.log(count)
// }).catch((e)=>{
//     console.log(e)
//
// })




db.collection(`Users`).find({name:"Mark"}).toArray().then((docs)=>{
  console.log(JSON.stringify(docs, 2, undefined))

}, (err)=>{
  console.log(`unable to fetch to-dos`, err)
})







// , function (err, r){
//   console.log(r)
// })


db.collection(`Todos`).find().count().then((count)=>{
  console.log(`To Dos count ${count}`)

}, (err)=>{
  console.log(`unable to fetch to-dos`, err)
})



// col.insertMany([{a:1}, {a:2}]).then(function(r) {
//    test.equal(2, r.insertedCount);
//    // Finish up test
//    db.close();




        // db.collection(`Todos`).find({}).toArray().then((arr)=>{
        // console.log(JSON.stringify(arr,undefined,2));
        //
        // }).catch((e)=>{
        //   console.log(e);
        // })




 db.close();

});
