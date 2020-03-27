const knex = require('knex');
const configuration = require('../../knexfile');

//criando conexão com o BDD
const connection = knex(configuration.development);

//exportando a conexão com o BDD
module.exports = connection;