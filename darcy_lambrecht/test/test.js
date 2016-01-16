const chai = require('chai');
const server = require(__dirname + '/../lib/server');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

describe('http server', () => {
  it('should respond to post requests', (done) => {
    request('localhost:3000')
      .get('/notes')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.eql('hello world');
        done();
      });
  });
});
