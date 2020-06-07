module.exports = (router, knex, jwt) => {
    

    // At this endpoint user posting a post on to the database.
    router

        .post("/creat_post", (req, res) => {
            // console.log({ "token": req.headers.cookie });
            // console.log(req.body.tittle);
            
            if (req.headers.cookie !== undefined) {
                var token = req.headers.cookie.slice(4);
                if (req.body.tittle == undefined || req.body.description == undefined) {
                    res.send("Please fill the title or description")
                } else {
                    var cookie = req.headers.cookie;
                    var token = cookie.slice(4);
                    var token_verify = jwt.verify(token, "tarique");                   
                    var dateTime = new Date();
                    
                    knex("post").insert({
                        "tittle": req.body.tittle,
                        "description": req.body.description,
                        "user_id":token_verify.first_name,
                        "created_on": dateTime
                    })
                        .then((data) => {
                            console.log("Data inserted succesfully....");
                            res.send("Your blog is posted succesfully....!");
                        }).catch((err) => {
                            console.log(err);
                            res.send(err);
                        });
                }
           



            }else{
                res.send({"error":"please login"});

            }
        })

}
// -------------------------------------------------------------------------------------------------------

// module.exports = (router, knex) => {
//     router
//         .get('/get_post', (req, res) => {
//             knex.select('blog')
//                 .from('post')
//                 .where("post_id",1)
//                 .then((data) => {
//                     for (i of data){
//                         res.send(i.blog);
//                         console.log(i.blog)
//                     }



//                 })
//                 .catch((err) => {
//                     res.send(err)
//                 })



//         })


//         .post('/post', (req, res) => {
//             var user = {
//                 "blog": req.body.blog

//             }
//             knex('post')
//                 .insert(user).then((results) => {
//                     console.log(results)
//                     if (results) {
//                         res.send('Your blog is posted')

//                     } else {
//                         res.send('Unsuccesfully!');
//                     }
//                 })
//                 .catch((err) => { console.log(err); })

//         })
// }