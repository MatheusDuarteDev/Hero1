
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
    table.increments();

    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    //criando o relationamento c/ a ong que criou
    //o incident
    table.string('ong_id').notNullable();
    
    //criando a chave estrangeira
    //toda vez que ong_id estiver preenchido, ele precisa ser um id
    //que esteja cadastrado dentro da tabela ONG

    table.foreign('ong_id').references('id').inTable('ongs');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
