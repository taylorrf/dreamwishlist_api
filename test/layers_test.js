'use strict';

var should = require('chai').should(),
expect = require('chai').expect,
api = require('supertest')('http://localhost:3000'),
Bluebird = require('bluebird');

describe('Layers', function(){

  before(function () {
    return require('../models').sequelize.sync();
  });

  beforeEach(function () {
    this.models = require('../models');
    this.current_dream = {};

    return Bluebird.all([
      this.models.Layer.destroy({ truncate: true })
    ]);
  });

  it('Forbidden on non-authenticated layers', function(done){
    api.get('/api/layers')
    .set('Accept', 'application/json')
    .expect(403, done);
  });

  it('creates a new layer', function (done) {
    this.models.User.create({
      name: 'mary',
      firebase_key: 'secrectnewlayer'
    }).bind(this).then(function (user) {
      this.models.Dream.create({
        category: "movie",
        subcategory: "inception",
        user_id: user.id
      }).then(function (dream) {
        api.post('/api/layers')
        .set('Accept', 'application/json')
        .set('firebase_key', 'secrectnewlayer')
        .send({
            dream_id: dream.id,
            type: "product",
            description: "Life Dream",
            url: "http://assets.ru/product.jpg",
            product_id: "332"
        })
        .expect(200)
        .end(function(err, res){
          expect(res.body).to.have.property("dream_id");
          expect(res.body).to.have.property("type");
          expect(res.body.type).to.equal("product");
          expect(res.body).to.have.property("description");
          expect(res.body.description).to.equal("Life Dream");
          expect(res.body).to.have.property("url");
          expect(res.body.url).to.equal("http://assets.ru/product.jpg");
          expect(res.body).to.have.property("product_id");
          expect(res.body.product_id).to.equal("332");
          done();
        })
      })
    });
  });

  it('get all layers of a dream', function (done) {
    this.models.User.create({
      name: 'mary',
      firebase_key: 'secrectalllayer'
    }).bind(this).then(function (user) {
      this.models.Dream.create({
        category: "movie",
        subcategory: "inception",
        user_id: user.id
      }).bind(this).then(function (dream) {
        this.models.Layer.create({
            dream_id: dream.id,
            type: "product",
            description: "Life Dream",
            url: "http://assets.ru/product.jpg",
            product_id: "332"
        }).then(function (layer) {
          api.get('/api/layers/dream/'+layer.dream_id)
          .set('firebase_key', 'secrectalllayer')
          .expect(200)
          .end(function(err, res){
            var firstlayer = res.body[0];
            expect(firstlayer).to.have.property("dream_id");
            expect(firstlayer).to.have.property("user_id");
            expect(firstlayer).to.have.property("createdAt");
            expect(firstlayer).to.have.property("updatedAt");
            expect(firstlayer).to.have.property("type");
            expect(firstlayer.type).to.equal("product");
            expect(firstlayer).to.have.property("description");
            expect(firstlayer.description).to.equal("Life Dream");
            expect(firstlayer).to.have.property("url");
            expect(firstlayer.url).to.equal("http://assets.ru/product.jpg");
            expect(firstlayer).to.have.property("product_id");
            expect(firstlayer.product_id).to.equal("332");
            done();
          })
        })
      })
    });
  });

  it('get an user layer', function (done) {
    this.models.User.create({
      name: 'mary',
      firebase_key: 'secrectgetlayer'
    }).bind(this).then(function (user) {
      this.models.Dream.create({
        category: "movie",
        subcategory: "inception",
        user_id: user.id
      }).bind(this).then(function (dream) {
        this.models.Layer.create({
            dream_id: dream.id,
            type: "product",
            description: "Life Dream",
            url: "http://assets.ru/product.jpg",
            product_id: "332"
        }).then(function (layer) {
          api.get('/api/layers/'+layer.id)
          .set('firebase_key', 'secrectgetlayer')
          .expect(200)
          .end(function(err, res){
            expect(res.body).to.have.property("dream_id");
            expect(res.body).to.have.property("user_id");
            expect(res.body).to.have.property("createdAt");
            expect(res.body).to.have.property("updatedAt");
            expect(res.body).to.have.property("type");
            expect(res.body.type).to.equal("product");
            expect(res.body).to.have.property("description");
            expect(res.body.description).to.equal("Life Dream");
            expect(res.body).to.have.property("url");
            expect(res.body.url).to.equal("http://assets.ru/product.jpg");
            expect(res.body).to.have.property("product_id");
            expect(res.body.product_id).to.equal("332");
            done();
          })
        })
      })
    });
  });

  it('updates a layer', function (done) {
    this.models.User.create({
      name: 'mary',
      firebase_key: 'secrectupdatelayer'
    }).bind(this).then(function (user) {
      this.models.Dream.create({
        category: "movie",
        subcategory: "inception",
        user_id: user.id
      }).bind(this).then(function (dream) {
        this.models.Layer.create({
            dream_id: dream.id,
            type: "product",
            description: "Life Dream",
            url: "http://assets.ru/product.jpg",
            product_id: "332"
        }).then(function (layer) {
          api.put('/api/layers')
          .send({
              id: layer.id,
              type: "video",
              description: "cool",
              url: "http://assets.ru/productupdated.jpg",
              product_id: "444"})
          .set('firebase_key', 'secrectupdatelayer')
          .set('Accept', 'application/json')
          .expect(200)
          .end(function(err, res){
            expect(res.body).to.have.property("type");
            expect(res.body.type).to.equal("video");
            expect(res.body).to.have.property("description");
            expect(res.body.description).to.equal("cool");
            expect(res.body).to.have.property("url");
            expect(res.body.url).to.equal("http://assets.ru/productupdated.jpg");
            expect(res.body).to.have.property("product_id");
            expect(res.body.product_id).to.equal("444");
            done();
          })
        })
      })
    });
  });

  it('delete a layer', function (done) {
    this.models.User.create({
      name: 'bob',
      firebase_key: 'secrectdestroylayer'
    }).bind(this).then(function (user) {
      this.models.Dream.create({
        category: "sport",
        subcategory: "sleeping",
        user_id: user.id
      }).bind(this).then(function (dream) {
        this.models.Layer.create({
            dream_id: dream.id,
            type: "product",
            description: "Life Dream",
            url: "http://assets.ru/product.jpg",
            product_id: "332"
        }).then(function (layer) {
          api.delete('/api/layers/'+layer.id)
          .set('firebase_key', 'secrectdestroylayer')
          .expect(200)
          .end(function(err, res){
            expect(res.body).to.have.property("success");
            expect(res.body.success).to.equal(true);
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.equal("Layer was successfully deleted");
            done();
          })
        });
      });
    });
  });
});
