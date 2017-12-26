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


// before each test case - do this
beforeEach((done)=>{
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
    
      it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();
     supertest(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });
  
    it('should return 404 for an invalid ObjectID', (done) => {
     supertest(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done);
  });
  
})


describe(`DELETE /todos/:id`, ()=>{

    it(`should delete a todo document`,(done)=>{
        var hexID = todos[0]._id.toHexString();
        supertest(app)
        .delete(`/todos/${hexID}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo._id).toBe(hexID);    
            })
            .end((err, res)=>{
                if(err){
                    return done(err)
                }
                Todo.findById(hexID).then((todo_del)=>{
                    expect(todo_del).toNotExist()
                    done()
                }).catch((e)=>{
                    done(e)
                })
            })
    })
    
    
    //done is a Mocha thing 
    //end is a supertest thing
    
    it(`should return a 404 for a Todo which isn't in the db`, (done)=>{
        var hexID = new ObjectID()
        supertest(app)
        .delete(`/todos/${hexID}`)
        .expect(404)
        .end(done)
    })
    
    it(`should return a 404 for a Todo which isn't correct`, (done)=>{
        supertest(app)
        .delete(`/todos/123`)
        .expect(404)
        .end(done)
    })

})




