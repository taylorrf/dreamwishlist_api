"use strict";

var models  = require('../models');

var dreams = function(app){
  /**
  * @api {post} user Create a new User
  * @apiName CreateUser
  * @apiGroup User
  *
  * @apiParam {String} firebase_key Unique Key provided by firebase.google.com service.
  *
  * @apiParamExample {json} Request-Example:
  *     {
  *       "name": "John Doe",
  *       "firebase_key": "123123"
  *     }
  *
  * @apiSuccessExample {json} Success-Response:
  * HTTP/1.1 200 OK
  *  {
  *  }
  */
  app.post('/api/dreams', function(req, res, next) {
    models.Dream.create({
      category: req.body.category,
      subcategory: req.body.subcategory,
      user_id: req.user_id
    }).then(function(dream){
        res.json(dream);
    })
  });
}

module.exports = dreams;
