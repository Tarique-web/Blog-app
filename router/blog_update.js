module.exports = (router, knex,jwt) => {

    router

        .put("/update_blog/:id", (req, res) => {
            // var cookie = req.headers.cookie;
            // var token = cookie.slice(4);
            // var token_verify = jwt.verify(token, "tarique");
            // console.log(token_verify)
            knex('post').where({"id":req.params.id}).update(req.body).then((result) => {
                res.send("Updated succesfully!!")
            })
            .catch((err) => {
                res.send(err)
        })
            // 
        })

}