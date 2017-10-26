

const {MongoClient, ObjectID} = require("mongodb");



// no need to pull off the .mongoclient call
// ObjectID constructor function allows us to make nww object UD's on the fly




MongoClient.connect(`mongodb://localhost:27017/ToDoApp`, (err, db)=>{

if(err){
return console.log(err);
}
console.log(`connected to mongodb`)


// delete many - target many docs and remove them

// db.collection(`Todos`).deleteMany({text : "Eat Lunch"}).then((res)=>{
//   console.log(`success as this was`, res);
// }).catch((e)=>{
//   console.log(`error was:`, e);
// })

//delte one - one documents


// db.collection(`Todos`).deleteOne({text : "Eat Lunch"}).then((res)=>{
//   console.log(`success as this was`, res);
// }).catch((e)=>{
//   console.log(`error was:`, e);
// })


db.collection(`Users`).findOneAndDelete({_id:new ObjectID(`59d1156c4191921af883b179`)}).then((res)=>{
console.log(res);
}).catch((e)=>{
  console.log(e);
})



//find one and delete - removes an indivudal item and returns them values   - returns the value you delted

// db.collection(`Todos`).findOneAndDelete({completed : true}).then((res)=>
// {console.log(`result:`, res)}
// ).catch((e)=>{console.log(`error was:`, e)})

db.collection('Users').deleteMany({name: "Mark"}).then((res)=>{
console.log(res);
}).catch((e)=>{
  console.log(e);
})

// db.collection(`Users`).deleteOne({_id : ObjectID59d1156c4191921af883b177}).then((res)=>{
//   console.log(`SUCCESS`, res);
// }).catch((e)=>{
//   console.log(`ERROR`, e);
// })





 db.close();

});
