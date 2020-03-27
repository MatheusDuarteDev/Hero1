
exports.up = function(knex) {
    //criando a tabela
    //createTable recebe 2 params, o nome da tabela e recebe a tablela por param
    return knex.schema.createTable('ongs', function(table) {
        table.string('id').primary();
        //campo nome e não pode ser nulo
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        //o segundo param é a quantidade de letras do campo.
        table.string('uf', 2).notNullable();
    });
}

exports.down = function(knex) {
    //método p/ deletar tabela caso de merda
    return knex.schema.dropTable('ongs')
};
