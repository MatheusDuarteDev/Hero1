const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response)  {
        const ongs = await connection('ongs').select('*');
      
          return response.json(ongs);
      },
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
 
        const id = crypto.randomBytes(4).toString('HEX');
    
        //const data = request.body;
        //a constante DATA recebe os dados da requisicao

        //qual é o nome da tabela que eu quero inserir dados?
        await connection('ongs').insert({
        //essas são as colunas que quero inserir no BDD
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    })
    // retorne apenas o ID
    return response.json({ id });
    }
};