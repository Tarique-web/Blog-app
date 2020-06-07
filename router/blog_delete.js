module.exports = (router, knex) =>{

    router
        .delete('/blog_delete/:id', (req, res) => {
            knex('post')
                .where('id', req.params.id).del()
                .then((result) => {
                    res.send("blog deleted succesfully !!!")

                })
                    .catch((err) => { res.send(err) })
        })
}
