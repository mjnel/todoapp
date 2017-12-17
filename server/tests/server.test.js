const expect  = require ("expect");
const supertest =  require("supertest");


const {app} = require("./../server");
const {Todo} = require("./../models/todo");
const {ObjectID} = require("mongodb");

//**************************************


const todos = [
  {
     _id: new ObjectID(),
    text: "firstTestToDo"
  },
  {
    _id: new ObjectID(),
    text:"secondToDo"
  }
]

beforeEach ((done)=>{
  Todo.remove({}).then(()=> {
    return Todo.insertMany(todos);
  }).then(()=> done())
})


describe(`POST /todos`,() =>{
 it(`should create a new todo`,(done)=>{
   var text = "Test todo text"

   supertest(app)
   .post(`/todos`)
   .send({text})
   .expect(200)
   .expect((res)=>{
     expect(res.body.text).toBe(text);
   })
.end((err, res)=>{
  if(err){
    return done(err)
  }
  Todo.find({text}).then((todos)=>{
    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe(text);
    done()
  }).catch((e)=> done(e))
})
})


it(`should not create a todo with invalid data`,(done)=>{
supertest(app)
  .post(`/todos`)
  .send({})
  .expect(400)
  .end((err, res)=>{
    if(err){
      return done (err)
    }
  Todo.find().then((todos)=>{
      expect(todos.length).toBe(2)
      done()
    }).catch((e)=> done(e))

    })
})
});




describe(`GET /todos`,() =>{
 it(`should get all the todos`,(done)=>{

   supertest(app)
   .get(`/todos`)
   .expect(200)
   .expect((res)=>{
      expect(res.body.todos.length).toBe(2);
   })
.end(done)
   
 })
 

})


//invalid objectID = 404 
// veritfy valid object ID - but no doc = 404 
//pass in object ID which does match a doc = get response in body

//toHexString is a method on the Object ID which converts the objecr ID to a string 

describe(`GET /todos/:id`, ()=>{
    
    it(`should return todo doc`,(done)=>{
        supertest(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(todos[0].text)         
            })
            .end(done)
    })
    
      it('should return 404 if todo not found - Site', (done) => {
    var hexId = new ObjectID().toHexString();
     supertest(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });
  
  

})


   // it should retuen 404 for non object id 
    //todos/123 
    //make sure get 404
    