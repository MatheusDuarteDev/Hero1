///retornar casos específicos de uma única ong

module.exports = {
    async index(request, resopnse) {
        const ong_id = request.headers.autorization;

        const incidents = await connection('incidents')
        .where('ong_id', id)
        .select('*');

        return response.json(incidents);
    }
}