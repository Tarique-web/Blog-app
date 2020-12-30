
exports.up = function (knex) {
    return knex.schema.createTable("userBlog", function (table) {

        table.increments().primary()
        table.string("user_id").notNullable()
        table.string("tittle").notNullable()
        table.string("description").notNullable()
        table.dateTime("created_on").notNullable()

    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("userBlog");

};
