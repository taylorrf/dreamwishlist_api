'use strict';

var should = require('chai').should(),
expect = require('chai').expect,
api = require('supertest')('http://localhost:3000'),
Bluebird = require('bluebird');

describe('Dreams', function(){

  before(function () {
    return require('../models').sequelize.sync();
  });

  beforeEach(function () {
    this.models = require('../models');

    return Bluebird.all([
      this.models.Dream.destroy({ truncate: true })
    ]);
  });

  it('Forbidden on non-authenticated dreamers', function(done){
    api.get('/api/dreams')
    .set('Accept', 'application/json')
    .expect(403, done);
  });

  it('creates a new dream', function (done) {
    api.post('/api/dreams')
    .set('Accept', 'application/x-www-form-urlencoded')
    .set('firebase_key', 'secretmary')
    .send({
      category : "movie",
      subcategory : "inception"
    })
    .expect(200)
    .end(function(err, res){
      expect(res.body).to.have.property("category");
      expect(res.body.category).to.equal("movie");
      expect(res.body).to.have.property("subcategory");
      expect(res.body.subcategory).to.equal("inception");
      done();
    })
  });

  it('get all dreams of a user', function (done) {
    this.models.User.create({
      name: 'mary',
      firebase_key: 'secrectgetdream'
    }).bind(this).then(function (user) {
      this.models.Dream.create({
        category: "movie",
        subcategory: "inception",
        user_id: user.id
      }).then(function (dream) {
        api.get('/api/dreams')
        .set('firebase_key', 'secrectgetdream')
        .expect(200)
        .end(function(err, res){
          var firstdream = res.body[0];
          expect(firstdream).to.have.property("category");
          expect(firstdream.category).to.equal("movie");
          expect(firstdream).to.have.property("subcategory");
          expect(firstdream.subcategory).to.equal("inception");
          expect(firstdream.User).to.be.instanceof(Object);
          expect(firstdream.User.name).to.equal('mary');
          done();
        })
      });
    });
  });

  it('get an user dream', function (done) {
    this.models.User.create({
      name: 'bob',
      firebase_key: 'secrectgetbob'
    }).bind(this).then(function (user) {
      this.models.Dream.create({
        category: "sport",
        subcategory: "football",
        user_id: user.id
      }).then(function (dream) {
        api.get('/api/dreams/'+ dream.id)
        .set('firebase_key', 'secrectgetbob')
        .expect(200)
        .end(function(err, res){
          expect(res.body).to.have.property("category");
          expect(res.body.category).to.equal("sport");
          expect(res.body).to.have.property("subcategory");
          expect(res.body.subcategory).to.equal("football");
          expect(res.body.User).to.be.instanceof(Object);
          expect(res.body.User.name).to.equal('bob');
          done();
        })
      });
    });
  });

  it('updates a dream', function (done) {
    this.models.User.create({
      name: 'bob',
      firebase_key: 'secrectupdatebob'
    }).bind(this).then(function (user) {
      this.models.Dream.create({
        category: "sport",
        subcategory: "football",
        user_id: user.id
      }).then(function (dream) {
        api.put('/api/dreams/')
        .send({id: dream.id, category: "dance", subcategory:"queen"})
        .set('firebase_key', 'secrectgetbob')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res){
          expect(res.body).to.have.property("category");
          expect(res.body.category).to.equal("dance");
          expect(res.body).to.have.property("subcategory");
          expect(res.body.subcategory).to.equal("queen");
          done();
        })
      });
    });
  });

  it('delete a dream', function (done) {
    this.models.User.create({
      name: 'bob',
      firebase_key: 'secrectdestroyebob'
    }).bind(this).then(function (user) {
      this.models.Dream.create({
        category: "sport",
        subcategory: "sleeping",
        user_id: user.id
      }).then(function (dream) {
        api.delete('/api/dreams/'+dream.id)
        .set('firebase_key', 'secrectdestroyebob')
        .expect(200)
        .end(function(err, res){
          expect(res.body).to.have.property("success");
          expect(res.body.success).to.equal(true);
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("Dream was successfully deleted");
          done();
        })
      });
    });
  });
});
