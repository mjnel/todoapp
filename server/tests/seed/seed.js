const {ObjectID} = require("mongodb");
const jwt = require("jsonwebtoken");


const {Todo} = require ("./../../models/todo");
const {User} = require ("./../../models/user");


const userOneId = new ObjectID();
const userTwoId = new ObjectID();



const users = [
    {
        _id: userOneId,
        email: "mark@example.com",
        password: "userOnePass",
        tokens: [
            {
                access: "auth",
                token:jwt.sign({_id: userOneId, access: "auth"}, `abc123`).toString()
            }
            ]
    },{
        
       _id: userTwoId,
        email: "sam@example.com",
        password: "userTwoPass"
       }
    ]

const todos = [
  {
     _id: new ObjectID(),
    text: "firstTestToDo"
  },
  {
    _id: new ObjectID(),
    text:"secondToDo",
    completed: true,
    completedAt: 3333
  }
]

const populateToDos = (done)=>{
     Todo.remove({}).then(()=> {
    return Todo.insertMany(todos);
  }).then(()=> done())
}


const populateUsers =(done)=>{
    User.remove({}).then(()=>{
       var userOne = new User(users[0]).save(); 
       var userTwo = new User(users[1]).save(); 
       
       return Promise.all([userOne, userTwo])
    }).then (()=> done());
    
}




module.exports = {
    todos,
    populateToDos,
    users,
    populateUsers
    
}