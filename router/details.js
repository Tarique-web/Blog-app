module.exports = (router, knex,jwt) => {

    router



        .get("/get_user", (req, res) => {
            var cookie = req.headers.cookie;
            var token = cookie.slice(4);
            var token_verify = jwt.verify(token, "tarique").first_name;
            console.log(token_verify)
            knex.from("post").orderBy("id","desc").where("user_id",token_verify)
                .then((data) => {
                   
                      
                    console.log(data);
                    
                    
                    res.send(data);
                }).catch((err) => {
                    res.send("There are some errors");
                });


        })

        // At this endpoint user will get all post posted by users.
        .get("/getallposts", (req, res) => {
            knex.from("post").orderBy("id", "desc")
                .then((data) => {
                    res.send(data);
                }).catch((err) => {
                    res.send("There are some errors");
                    console.log(err);
                });

        })
}