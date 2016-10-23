/**
 * Feeds functional test.
 *
 * @author taylorrf
 * @version 1.0
 */

'use strict';

var should = require('chai').should(),
expect = require('chai').expect,
api = require('supertest')('http://localhost:3000'),
Bluebird = require('bluebird');

describe('Feeds', function(){

  before(function () {
    return require('../models').sequelize.sync();
  });

  beforeEach(function () {
    this.models = require('../models');

    return Bluebird.all([
      this.models.Layer.destroy({ truncate: true }),
      this.models.User.destroy({ truncate: true }),
      this.models.Dream.destroy({ truncate: true })
    ]);
  });

  it('get all layers of a dream', function (done) {
    this.models.User.create({
      name: 'mary',
      firebase_key: 'secrectfeed'
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
          api.get('/feed/dreams/')
          .expect(200)
          .end(function(err, res){
            var firstlayer = res.body[0];
            expect(firstlayer).to.have.property("category");
            expect(firstlayer).to.have.property("subcategory");
            expect(firstlayer).to.have.property("user_id");
            expect(firstlayer).to.have.property("createdAt");
            expect(firstlayer).to.have.property("updatedAt");
            expect(firstlayer.User).to.be.instanceof(Object);
            expect(firstlayer.User.name).to.equal('mary');
            expect(firstlayer.Layers).to.be.instanceof(Object);
            expect(firstlayer.Layers[0].type).to.equal('product');
            expect(firstlayer.Layers[0].description).to.equal('Life Dream');
            expect(firstlayer.Layers[0].url).to.equal('http://assets.ru/product.jpg');
            expect(firstlayer.Layers[0].product_id).to.equal('332');
            done();
          })
        })
      })
    });
  });
});
