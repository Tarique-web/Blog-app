const knex = require("../config/dbconfig")
const bcrypt = require("bcryptjs");

exports.register = (req, res) => {
    /**
        * Request Validation
        */
    if (!req.body || JSON.stringify(req.body) == "{}") {
        logger.error({ "registerController": "request body con't be empty" })
        return res.status(400).send({
            message: "Request body can not be empty",
            status: 400
        });
    }
    if (!req.body.first_name || req.body.first_name == "") {
        return res.status(400).send({
            message: "first_name  can not be empty",
            status: 400
        });
    }
    if (!req.body.last_name || req.body.flast_name == "") {
        return res.status(400).send({
            message: "last_name can not be empty",
            status: 400
        });
    }
    if (!req.body.email || req.body.email == "") {
        return res.status(400).send({
            message: "Email can not be empty",
            status: 400
        });
    }
    if (!req.body.Mobile_no || req.body.Mobile_no == "") {
        return res.status(400).send({
            message: "User mobile can not be empty",
            status: 400
        });
    }
    if (!req.body.password || req.body.password == "") {
        return res.status(400).send({
            message: "password can not be empty",
            status: 400
        });
    }

    bcrypt.hash(req.body.password, 3).then((hash) => {

        var user = {
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "email": req.body.email,
            "Mobile_no": req.body.Mobile_no,
            "password": hash
        }

        knex
            .select('*').from('userRegister')
            .where({ "email": req.body.email })
            .then((data) => {

                if (data.length==0) {
            
                    knex.select('*').from('userRegister')
                        .insert(user)
                        .then(() => {
                            res.status(200).send({
                                message: "Your account is successfully created",
                                name:user.first_name,
                                status: 200
                            })

                        })
                        .catch((err) => {
                            res.status(500).send({
                                message: err.message || "Some error occurred while create users account.",
                                status: 500
                            });
                        })
                } else {
                    res.status(400).send({
                        message: "Your account is already exist",
                        status: 400
                    })
                }
            }).catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occurred while finding users account.",
                    status: 500
                });
            })

    })



}