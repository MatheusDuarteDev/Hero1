//VAI ARMAZENAR AS ROTAS DA MINHA APLICAÇÃO

//importando o express dentro de routes.js
const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

//desacoplando o módulo de rotas do express em uma nova variável
const routes = express.Router();

//rota de loguin
routes.post('/sessions', SessionController.create);

//criar rota p listar todas as ongs do BDD
//quero selecionar todos os campos de tds registros dentro da tabela ongs
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);

routes.get('/profile', ProfileController.index);

//agora uma rota para deletar os casos
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;

