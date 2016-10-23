'use strict';

var should = require('chai').should(),
expect = require('chai').expect,
api = require('supertest')('http://localhost:3000'),
Bluebird = require('bluebird');

describe('User', function(){

  before(function () {
    return require('../models').sequelize.sync();
  });

  beforeEach(function () {
    this.models = require('../models');

    return Bluebird.all([
      this.models.User.destroy({ truncate: true })
    ]);
  });

  it('Forbidden on non-authenticated clients', function(done){
    api.get('/api/user')
    .set('Accept', 'application/json')
    .expect(403, done);
  });

  it('lists the user infos', function (done) {
    this.models.User.create({
      name: 'john doe',
      firebase_key: 'secretjohn',
      photo_url: 'john.gif'
    }).then(function () {
      api.get('/api/user')
      .set('Accept', 'application/json')
      .set('firebase_key', 'secretjohn')
      .expect(200)
      .end(function(err, res){
        expect(res.body).to.have.property("name");
        expect(res.body.name).to.not.equal(null);
        expect(res.body.name).to.equal("john doe");
        expect(res.body).to.have.property("firebase_key");
        expect(res.body.firebase_key).to.not.equal(null);
        expect(res.body.firebase_key).to.equal("secretjohn");
        expect(res.body).to.have.property("photo_url");
        expect(res.body.photo_url).to.not.equal(null);
        expect(res.body.photo_url).to.equal("john.gif");
        expect(res.body).to.have.property("Dreams");
        expect(res.body.Dreams).to.be.instanceof(Array);
        done();
      })
    })
  });

  it('creates a new user', function (done) {
    api.post('/user')
    .set('Accept', 'application/json')
    .send({name : "mary", firebase_key : "secretmary", photo_url: "mary.jpg"})
    .expect(200)
    .end(function(err, res){
      expect(res.body).to.have.property("name");
      expect(res.body.name).to.equal("mary");
      expect(res.body).to.have.property("firebase_key");
      expect(res.body.firebase_key).to.equal("secretmary");
      expect(res.body).to.have.property("photo_url");
      expect(res.body.photo_url).to.equal("mary.jpg");
      done();
    })
  });
});
