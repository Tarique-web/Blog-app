
exports.up = (knex) => {

    return knex.schema.createTable('userRegister', (table) => {
        table.increments().primary()
        table.string('firstName').notNullable()
        table.string('lastName').notNullable()
        table.text('email').notNullable()
        table.text('mobile').notNullable()
        table.text('password').notNullable()

    });

};

exports.down = (knex) => {
    return knex.schema.dropTableIfExists("userRegister");

};
