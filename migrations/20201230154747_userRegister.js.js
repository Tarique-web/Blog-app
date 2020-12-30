
exports.up =(knex) => {

    return knex.schema.createTable('userRegister',(table) => {
        table.increments().primary()
        table.string('first_name').notNullable()
        table.string('last_name').notNullable()
        table.text('email').notNullable()
        table.text('Mobile_no').notNullable()
        table.text('password').notNullable()

    });

};

exports.down = (knex) => {
    return knex.schema.dropTableIfExists("userRegister");

};
