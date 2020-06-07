module.exports = (router, knex) => {

   router

      .post('/signup', (req, res) => {
         var user = [{
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "email": req.body.email,
            "password": req.body.password,
            "Mobile_no": req.body.Mobile_no
         }]
         console.log(i)

         for (var i of user) {
            if ((i.first_name.length) !== 0 && (i.last_name.length) !== 0 && (i.email.length) !== 0 && (i.password.length) !== 0 && (i.Mobile_no.length !== 0) && (i.Mobile_no.length == 10)) {
               knex
                  .select('*').from('users')
                  .where({ "first_name":req.body.first_name,"last_name":req.body.last_name,"email":req.body.email,"password":req.body.password,"Mobile_no":req.body.Mobile_no })
                  .then((data) => {
                     console.log(data);

                     if (data.length <=0) {
                        knex('users')
                           .insert(i)
                           .then((results) => {
                              console.log(results)
                           })
                           .catch((err) => {
                              console.log(err);
                           })
                     } else {
                        console.log("user exist")
                        res.send("This user exist")
                     }
                  }).catch((err) => {
                     console.log(err);
                  })
                     
                  
               } else {
                  console.log("you are entering something wrong")

                  res.send("unsuccesfully")
      
         }
         }
      })
}

