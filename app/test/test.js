const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app.js');


chai.use(chaiHttp);
const { expect } = chai;


describe('POST/signoff', () => {
    it('Should return the user if signed off with these fields', (done) => {
        const newSignoff = {
            name: 'blue',
            grade: '12',
            email: 'blue@gmail.com',
        };

        chai.request(app)
            .get('/signoff')
            // .send(newSignoff)
            .end((err, res) => {
                if (err) done(err);
                // expect(res).have.status(200);
                // expect(res.body.status).to.deep.equal(200);
                done();
            });
    });
});