module.exports = (router, knex) =>{

    router
        .delete('/delete/:id', (req, res) => {
            knex('users')
                .where('id', req.params.id).del()
                .then((result) => {
                    res.send("deleted succesfully !!!")

                })
                    .catch((err) => { res.send(err) })
        })
}
