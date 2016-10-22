"use strict";

var models  = require('../models');

var dreams = function(app){
  /**
  * @api {post} dreams Create a Dream
  * @apiName CreateDream
  * @apiGroup Dream
  *
  * @apiParam {String} category Dream category.
  * @apiParam {String} subcategory Dream subcategory.
  *
  * @apiParamExample {json} Request-Example:
  *     {
  *       "category": "Sport",
  *       "subcategory": "Football"
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
