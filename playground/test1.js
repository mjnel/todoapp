




app.delete(`/users/me/token`, authenticate, async (req,res) =>{
    try{
      await req.user.removeToken(req.token)
      res.status(200).send()

    }catch(e){
      res.status(400).send()


    }

})
