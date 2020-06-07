module.exports = (knex) => {

    knex.schema.hasTable('users').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('users', function (table) {
                table.increments('id').primary();
                table.string('first_name', 100);
                table.string('last_name', 100);
                table.text('email', 50);
                table.text('Mobile_no',12)
                table.text('password', 50)

            });
        } else {
            console.log('already exist! table');
        }
    });
    // this table for blog
    knex.schema.hasTable ("post").then(function (exists){
    if (!exists){
        return knex.schema.createTable("post",function(table){
    
            table.increments ("id").primary();
            table.string("user_id")
            table.string ("tittle")
            table.string ("description")
            table.dateTime ("created_on")
            
        })
  
    }else {
        console.log ( "Table already exist!...." )
    }
    

    
})
}

