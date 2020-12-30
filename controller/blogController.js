const knex = require('../config/dbconfig')
const jwt = require("jsonwebtoken");
const { update } = require('../config/dbconfig');

exports.blogPost = (req, res) => {


    /**
      * Request Validation
      */
    if (!req.body || JSON.stringify(req.body) == "{}") {
        console.log({ "registerController": "request body con't be empty" })
        return res.status(400).send({
            message: "Request body can not be empty",
            status: 400
        });
    }
    if (!req.body.tittle || req.body.tittle == "") {
        return res.status(400).send({
            message: "tittle  can not be empty",
            status: 400
        });
    }
    if (!req.body.description || req.body.description == "") {
        return res.status(400).send({
            message: "description can not be empty",
            status: 400
        });
    }

    const cookie = req.headers.cookie.slice(6);
    const token_verify = jwt.verify(cookie, process.env.SECRET_KEY);
    var dateTime = new Date();
   
    const blog = {
        "userId": token_verify.firstName,
        "tittle": req.body.tittle,
        "description": req.body.description,
        "created_on": dateTime,
        "email": token_verify.email
    }

    knex.select("*").from("userBlog").insert(blog)
        .then(() => {
            res.send({
                message: "success", blog,
                status: 200
            });


        }).catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while posting blog.",
                status: 500
            });
        })



}
exports.updateBlog = (req, res) => {
    /**
   * Request Validation
   */

    if (!req.params || (req.params.id) == "") {
        console.log({ "blogController": "updateBlog: blog id con't be empty" })
        return res.status(400).send({
            message: "blog Id can not be empty",
            status: 400
        });
    }
    if (!req.body || JSON.stringify(req.body) == "{}") {
        console.log({ "registerController": "request body con't be empty" })
        return res.status(400).send({
            message: "Request body can not be empty",
            status: 400
        });
    }
    const cookie = req.headers.cookie.slice(6);
    const token_verify = jwt.verify(cookie, process.env.SECRET_KEY);

    knex.select(
        "tittle",
        "description"
    ).from('userBlog')
        .where({ "email": token_verify.email })
        .andWhere({ "id": req.params.id })
        .update(req.body)
        .then((data) => {
            console.log("blog successfully updated")
            res.setHeader("content-type", "application/json");
            res.status(200).send({
                message: req.body,
                status: 200
            })

        }).catch((err) => {
            res.status(500).send({
                message: "user not found" || message.err,
                status: 500
            })
        })

}

exports.deleteBlog = (req, res) => {
    /**
  * Request Validation
  */
    if (!req.params || (req.params.id) == "") {
        console.log({ "blogController": "deleteBlog: blog id con't be empty" })
        return res.status(400).send({
            message: "blog Id can not be empty",
            status: 400
        });
    }

    const cookie = req.headers.cookie.slice(6);
    const token_verify = jwt.verify(cookie, process.env.SECRET_KEY);

    knex.select("*").from('userBlog')
        .where({ "email": token_verify.email })
        .andWhere({ "id": req.params.id })
        .del()
        .then(() => {
            console.log("blog successfully deleted")

            res.setHeader("content-type", "application/json");
            res.status(200).send({
                message: "Blog successfully delated",
                status: 200
            })

        }).catch((err) => {
            res.status(500).send({
                message: "blog Id not found" || message.err,
                status: 500
            })
        })


}

//User get his all posted blog
exports.getBlog = (req, res) => {
    const cookie = req.headers.cookie.slice(6);
    const token_verify = jwt.verify(cookie, process.env.SECRET_KEY);

    knex.select(
        "userId",
        "tittle",
        "description",
        "created_on"
    ).from('userBlog')
        .where({ "email": token_verify.email })
        .then((data) => {

            res.setHeader("content-type", "application/json");
            res.status(200).send({
                message: data,
                status: 200
            })

        }).catch((err) => {
            res.status(500).send({
                message: "user not found" || message.err,
                status: 500
            })
        })

}

//All User can see all user posted Blog
exports.getAllBlog = (req, res) => {

    knex
        .select(
            "userId",
            "tittle",
            "description",
            "created_on"
        )
        .from('userBlog')
        .then((data) => {

            res.setHeader("content-type", "application/json");
            res.status(200).send({
                message: data,
                status: 200
            })

        }).catch((err) => {
            res.status(500).send({
                message: message.err,
                status: 500
            })
        })


}

// All user can get posted blog by id
exports.BlogbyId = (req, res) => {

    if (!req.params || (req.params.id) == "") {
        console.log({ "blogController": "BlogbyId: blog id con't be empty" })
        return res.status(400).send({
            message: "blog Id can not be empty",
            status: 400
        });
    }

    knex.select(
        "userId",
        "tittle",
        "description",
        "created_on"

    ).from('userBlog')
        .where({ "id": req.params.id })
        .then((data) => {


            res.setHeader("content-type", "application/json");
            res.status(200).send({
                message: data,
                status: 200
            })

        }).catch((err) => {
            res.status(500).send({
                message: "blog Id not found" || message.err,
                status: 500
            })
        })


}

