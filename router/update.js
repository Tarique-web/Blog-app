module.exports = (router, knex) => {

    router

        .put("/update/:id", (req, res) => {
            // var user = {
            //     "first_name": req.body.first_name,
            //     "last_name": req.body.last_name,
            //     "email": req.body.email,
            //     "password": req.body.password,
            //     "Mobile_no": req.body.Mobile_no
            // }
            knex('users').where({ 'id': req.params.id }).update(req.body).then((result) => {
                res.send("Updated succesfully!!")
            })
            .catch((err) => {
                res.send(err)
        })
            // 
        })

}