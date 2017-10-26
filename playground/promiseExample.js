

var randomNumber = Math.round(Math.random() * 100);


let  firstMethod = () =>{
  return new Promise ((resolve, reject)=>{


    if (randomNumber >= 2){
      setTimeout(()=>{
          return resolve(randomNumber);
        },2000)
  }
  else{
    reject(`The random number was under 2 and is: ${randomNumber}`);
      }
  })
}


let secondMethod = (num)=>{
  return new Promise((resolve, reject)=>{
      if(num >= 10){
        setTimeout(()=>{
          return resolve (num*num);
        },2000)
      }else{
        reject (`The number is not above or equal to 10, it is ${num}`);
      }
    })
}


firstMethod().then((resultOfFirst)=>{
  console.log(`first promise:`, resultOfFirst);
  return secondMethod(resultOfFirst)
}).then((finalRes)=>{
  console.log(`second promise:`, finalRes);

}).catch((e)=>{
  console.log(e);
})





// asyncAdd(5,7).then((res)=>{
//       console.log(`result`, res)
//       return asyncAdd(res,33)
//   }).then((res2)=>{
//       console.log(`new result is`, res2);
//   }).catch((err)=>{
//       console.log(err);
// })










//



//





// firstMethod.then((res)=>
// {
//   return res
// }).then(secondMethod(res))
//
// .catch((wrongResult)=>{
//   console.log(wrongResult);
//
//
// })











//const MongoClient = require("mongodb").MongoClient;
// no need to pull off the .mongoclient call
// ObjectID constructor function allows us to make nww object UD's on the fly
// const {MongoClient, ObjectID} = require("mongodb");
//
// // new instacne of ObjectID
// var obj = new ObjectID();
// console.log(obj.getTimestamp());
//
//
//
// MongoClient.connect(`mongodb://localhost:27017/ToDoApp`, (err, db)=>{
//
// if(err){
// return console.log(err);
// }
// console.log(`connected to mongodb`)
//
//
//
//
// // delete many - target many docs and remove them
//
//
//
//
//
// //delte one - one documents
//
// //find one and delete - removes an indivudal item and returns them values   - returns the value you delted
//
//  // db.close();
//
// });
