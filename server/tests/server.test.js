const expect  = require ("expect");
const supertest =  require("supertest");
const {ObjectID} = require("mongodb");

const {app} = require("./../server");
const {Todo} = require("./../models/todo");
const {User} = require("./../models/user");
const {todos, populateToDos, users, populateUsers} = require ("./seed/seed");

 
//**************************************


// before each test case (before each it block) 
beforeEach(populateUsers)
beforeEach(populateToDos)


describe(`POST /todos`,() =>{
 it(`should create a new todo`,(done)=>{
  var text = "Test todo text"

  supertest(app)
  .post(`/todos`)
  .set(`x-auth`, users[0].tokens[0].token)
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
  .set(`x-auth`, users[0].tokens[0].token)
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
  .set(`x-auth`, users[0].tokens[0].token)
  .expect(200)
  .expect((res)=>{
      expect(res.body.todos.length).toBe(1);
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
        .set(`x-auth`, users[0].tokens[0].token)
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(todos[0].text)         
            })
            .end(done)
    })
    
        it(`should not return a todo doc created by another user`,(done)=>{
        supertest(app)
        .get(`/todos/${todos[1]._id.toHexString()}`)
        .set(`x-auth`, users[0].tokens[0].token)
        .expect(404)
        .end(done)
    })
    
    
    
    
     it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();
     supertest(app)
      .get(`/todos/${hexId}`)
      .set(`x-auth`, users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });
  
    it('should return 404 for an invalid ObjectID', (done) => {
     supertest(app)
      .get(`/todos/123`)
      .set(`x-auth`, users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });
  
})


describe(`DELETE /todos/:id`, ()=>{

    it(`should delete a todo document`,(done)=>{
        var hexID = todos[0]._id.toHexString();
        supertest(app)
        .delete(`/todos/${hexID}`)
        .set(`x-auth`, users[0].tokens[0].token)
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
    
    
        it(`shouldn't delete a todo document created by someone else`,(done)=>{
        var hexID = todos[0]._id.toHexString();
        supertest(app)
        .delete(`/todos/${hexID}`)
        .set(`x-auth`, users[1].tokens[0].token)
        .expect(404)
        
            .end((err, res)=>{
                if(err){
                    return done(err)
                }
                Todo.findById(hexID).then((todo_del)=>{
                    expect(todo_del).toExist()
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
        .set(`x-auth`, users[1].tokens[0].token)
        .expect(404)
        .end(done)
    })
    
    it(`should return a 404 for a Todo which isn't correct`, (done)=>{
        supertest(app)
        .delete(`/todos/123`)
        .set(`x-auth`, users[1].tokens[0].token)
        .expect(404)
        .end(done)
    })

})


describe(`PATCH/todos/:id`, ()=>{
    
    it(`should update the ToDo`, (done)=>{
        var hexID = todos[0]._id.toHexString();
        var updateBoo = {completed: true,
                        text: "updatedTextOnFirstToDo"
        };
        
        supertest(app)
        .patch(`/todos/${hexID}`)
        .set(`x-auth`, users[0].tokens[0].token)
         .send(updateBoo)

        .expect(200)
        .expect((res)=>{
            // console.log(res.body)
            expect(res.body.updatedToDo.text).toBe(updateBoo.text);


        })
        .end((err, res)=>{
            if(err){
                return done(err)
            }
             Todo.findById(hexID).then((todo_update)=>{
            expect(res.body.updatedToDo.completed).toBe(true)
            expect(res.body.updatedToDo.completedAt).toBeA('number')
            done()
                 
        }).catch((e)=>{
            // console.log(e)
            done(e)
        })
        })
        
    })
    
    
    
    
        it(`shouldnt allow a user to update a ToDo created by someone else`, (done)=>{
        var hexID = todos[0]._id.toHexString();
        var updateBoo = {completed: true,
                        text: "updatedTextOnFirstToDo"
        };
        
        supertest(app)
        .patch(`/todos/${hexID}`)
        .set(`x-auth`, users[1].tokens[0].token)
         .send(updateBoo)
        .expect(404)
        .end(done)
        
    })
        
    
    
        

        
        
        
    it(`should clear completedAt when todo is not completed`, (done)=>{
        var hexID = todos[1]._id.toHexString();
        var updateText = {completed: false};
        
        supertest(app)
        .patch(`/todos/${hexID}`)
        .send(updateText)
        .set(`x-auth`, users[1].tokens[0].token)
        .expect(200)
        .expect((res)=>{
            expect(res.body.updatedToDo.completed).toBe(false)
            expect(res.body.updatedToDo.completedAt).toNotExist()

        })
        .end(done)

    })
    
      

    })
    
    describe(`GET/users/me`,()=>{
        
        it(`should return user if authenticated`, (done)=>{
            supertest(app)
            .get(`/users/me`)
            //.set = 1st arg is header name and 2nd is header value
            .set(`x-auth`, users[0].tokens[0].token)
            .expect(200)
            .expect((res)=>{
                expect(res.body._id).toBe(users[0]._id.toHexString())
                expect(res.body.email).toBe(users[0].email)
            })
            .end(done)
        })
      
      
        
        
        it(`should return a 401 if not authenticated`, (done)=>{
            supertest(app)
            .get(`/users/me`)
            .expect(401)
            .expect((res)=>{
                expect(res.body).toEqual({})
            })
            .end(done)

        })
        
    })
    
    
    describe(`POST /users`, ()=>{
        
        it(`should create a user`,(done)=>{
        var email = "mark_nelson@live.co.uk"
        var password = "password1234"
            
        supertest(app)
        .post(`/users`)
        .send({email, password})
        .expect(200)
        .expect((res)=>{
            expect(res.headers[`x-auth`]).toExist();
            expect(res.body._id).toExist();
            expect(res.body.email).toEqual("mark_nelson@live.co.uk")
        })
        .end((err)=>{
            if(err){
                return done(err)
            }
            User.findOne({email}).then((user)=>{
                expect(user).toExist();
                expect(user.password).toNotBe(password);
                done();
            }).catch((e)=>{done(e)})
            
            
        })
        })
        
        
        
        
        
        it(`should return valiation errors if request is invalid`,(done)=>{
            var email = "test";
            supertest(app)
            .post(`/users/`)
            .send({email: "adn",
                    password: "123"
            })
            .expect(400)
            .end(done)
            })
            
        
    
    
        it(`should not create user if email in use`,(done)=>{
            var email = "mark@example.com";
            supertest(app)
            .post(`/users/`)
            .send({email: users[0].email,
                  password: "password123"
                
            })
            .expect(400)
            .end(done)
            })
            
        

    })
    
    
    describe(`POST /users/login`, ()=>{
        
        it(`should login user and return auth token`, (done)=>{
            supertest(app)
            .post(`/users/login`)
            .send({email: users[1].email,
                    password: users[1].password
            })
            .expect(200)
            .expect((res)=>{
            expect(res.headers[`x-auth`]).toExist();     
                
            })
            .end((err, res)=>{
                if(err){
                    return done(err)
                }
                User.findById(users[1]._id).then((user)=>{
                    expect(user.tokens[1]).toInclude({
                        access: `auth`,
                        token: res.headers[`x-auth` ]
                    })
                    done()
                }).catch((e)=>{
                    done(e); 
                })
            })
        })

            
       
        
        
        it (`should reject invalid login`, (done)=>{
            supertest(app)
            .post(`/users/login`)
            .send({email: users[1].email,
                    password: users[1].password + `1`
            })
            .expect(400)
            .expect((res)=>{
                expect(res.headers[`x-auth`]).toNotExist()
            })
            .end((err, res)=>{
                if(err){
                    return done(err)
                }
                User.findById(users[1]._id).then((user)=>{
                    expect(user.tokens.length).toBe(1)
                    done()
                }).catch((e)=>{
                    done(e); 
                })
            })
            
            
     
            
        })
        
    })
    
    
    describe(`DELETE/users/me/token`, ()=>{
        
        it(`should remove auth token on logout`, (done)=>{
            supertest(app)
            .delete(`/users/me/token`)
            .set(`x-auth`, users[0].tokens[0].token)
            .expect(200)
            .end((err, res)=>{
                if(err){
                    return done(err)
                }
                User.findById(users[0]._id).then((user)=>{
                    expect(user.tokens.length).toBe(0)
                    done()
                }).catch((e)=>{
                    done(e); 
                })
            })

            
        })
        
    })


