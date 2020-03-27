const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            //.set('Authorization', '___')
            .send({
                name: "Abrigo do Pequenos",
                email: "abrigo@pequenos.com.br",
                whatsapp: "12345678901",
                city: "Praia Grande",
                uf: "SP"
            });
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });

    afterAll(async () => {
        await connection.destroy();
    });
});