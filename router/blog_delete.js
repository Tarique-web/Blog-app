module.exports = (router, knex,jwt) => {

    router

        .delete("/delete_blog/:id", (req, res) => {
           
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
                        knex('post').where({"id":id_user}).del()
                        .then((result) => {
                            res.send("Blog delete succesfully!!")
                   
                        }).catch((err)=>{
                            res.send(err)
                        })
                        if(j==id_user){
                            break

                        }
                    }else{
                        console.log('This blog is not written by you that\'s why you can\'t delete ');
                        // res.send("This Blog is not written by you")
                    }
            }              
            })
            .catch((err)=>{
                res.send(err)
            }) 
        })
}
