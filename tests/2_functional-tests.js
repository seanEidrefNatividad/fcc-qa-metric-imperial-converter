const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  suite('Routing Tests', function() {
    suite('GET /api/convert => conversion object', function () {
      test("Convert 20l (valid input)", function (done) {
        chai
        .request(server)
        .get("/api/convert")
        .query({input: "20l"})
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.body.initNum, 20)
          assert.equal(res.body.initUnit, "L")
          assert.approximately(res.body.returnNum, 5.28344, 0.1)
          assert.equal(res.body.returnUnit, "gal")
          done()
        })
      })

      test("Convert 20/10/5km (Invalid number)", function (done) {
        chai
        .request(server)
        .get("/api/convert")
        .query({input:'20/10/5km'})
        .end((err, res)=>{
          assert.equal(res.status, 200)
          assert.equal(res.body.initNum, undefined)
          done()
        })
      })
      test("Convert 5kilograms (Invalid unit)", function (done) {
        chai
        .request(server)
        .get('/api/convert')
        .query({input:"5kilograms"})
        .end((err,res)=>{
          assert.equal(res.status,200)
          assert.equal(res.body.initUnit, undefined)
          done()
        })
      })
      test("Convert 5.5.5kilograms (Invalid number and unit)", function (done) {
        chai
        .request(server)
        .get('/api/convert')
        .query({input:"5.5.5kilograms"})
        .end((err,res)=>{
          assert.equal(res.status, 200)
          assert.equal(res.body.initNum, undefined)
          assert.equal(res.body.initUnit, undefined)
          done()
        })
      })
      test("Convert gal (No number)", function (done) {
        chai
        .request(server)
        .get("/api/convert")
        .query({input:"gal"})
        .end((err,res)=>{
          assert.equal(res.status, 200)
          assert.equal(res.body.initNum, 1)
          assert.equal(res.body.initUnit, "gal")
          assert.approximately(res.body.returnNum, 3.78541, 0.1)
          assert.equal(res.body.returnUnit, "L")
          done()
        })
      })

    })
  })
});
