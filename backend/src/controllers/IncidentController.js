const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;
        
        const [count] = await connection('incidents').count();
          
        const incidents = await connection('incidents')
        
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        //limite 5 incidents por página
        .limit(5)
        //5 em 5 registros
        .offset((page - 1) * 5)
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]);

        response.header('X-total-count', count['count(*)']);
              
        return response.json(incidents);
    },

    async create(request, response) {
       
       const { title, description, value} = request.body;
       const ong_id = request.headers.authorization;
       
       const [id] = await connection('incidents').insert({
           title,
           description,
           value,
           ong_id,
       });
       return response.json({ id }); 
    },

    async delete(request, response) {
        const { id } = request.params;
        //estou pedindo o ID da ong p/ verificar se 
        //a ong que está deletando é a que criou
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if (incident.ong_id =! ong_id) {
            //se id de ong que esta tentando deletar
            //é diferente da que criou, retorne (401)
            //não autorizado
            return response.status(401).json({ error: 'Operation not permitted. '});
        }
        //se ele passa da condicao, pode deletar do BDD
        await connection('incidents').where('id', id).delete();
        //retorna resposta que deu certo, mas ñ tem conteudo
        return response.status(204).send();        

    }
};