module.exports = (router, knex,jwt) => {

    router

        .put("/update_blog/:id", (req, res) => {
           
            // console.log(typeof(id_user));
            
            var cookie = req.headers.cookie.slice(4);            
            var token_verify = jwt.verify(cookie, "tarique").first_name;            

            knex('post').where({"user_id":token_verify}).then((results)=>{
                id_user=(req.params.id)
                // res.send(results)
                for(var i of results){
                    j=i.id
                    if (j==id_user){  
                        console.log("if working")                                              
                        knex('post').where({"id":id_user}).update(req.body)
                        .then((result) => {
                            res.send("Updated succesfully!!")
                   
                        }).catch((err)=>{
                            res.send(err)
                        })
                        if(j==id_user){
                            break

                        }
                    }else{
                        console.log('This blog is not written by you');
                        // res.send("This Blog is not written bt you")
                    }
            }              
            })
            .catch((err)=>{
                res.send(err)
            }) 
        })
}
