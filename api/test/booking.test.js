
let bookingService = require('../src/service/booking.service');
let Bookings = require('../src/model/booking');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../src/index');

chai.use(chaiHttp);

describe('Bookings', () => {
    beforeEach((done) => {
        Bookings.remove({}, (err) => { 
           done();           
        });        
    });
});


describe('/POST get list booking', ()=>
{
    it('it should GET all booking of customer', (done) =>
    {
        let para={"customerPhone": "0908184981"};
        chai.request(server)
        .post('/api/booking/listByCustomer')
        .send(para)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(true);
              res.body.should.have.property('data').be.a('array');
          done();
        });
    });
});


describe('/POST insert book', ()=>
{
    it('it should insert one booking', (done) =>
    {
        let para= {"tableCode":"01","totalSlots":5,"customerName":"Nguyen Minh Thong","customerPhone":"0908184981"};
        chai.request(server)
        .post('/api/booking/save')
        .send(para)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data').have.property('tableCode') .eql('01');

          done();
        });
    });
});