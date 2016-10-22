"use strict";

var models  = require('../models');

var dreams = function(app){
  /**
  * @api {post} api/dreams Create a Dream
  * @apiName CreateDream
  * @apiGroup Dream
  *
  * @apiParam {String} category Dream category.
  * @apiParam {String} subcategory Dream subcategory.
  *
  * @apiParamExample {json} Request-Example:
  *  {
  *   "category": "Sport",
  *   "subcategory": "Football"
  *  }
  *
  * @apiSuccessExample {json} Success-Response:
  * HTTP/1.1 200 OK
  * {
  *   "id": 1,
  *   "category": "movie",
  *   "subcategory": "inception",
  *   "user_id": 2,
  *   "createdAt": "2016-10-22T19:08:45.056Z",
  *   "updatedAt": "2016-10-22T19:08:45.056Z"
  * }
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

  /**
   * @api {get} api/dreams/ All Dreams
   * @apiName AllDream
   * @apiGroup Dream
   *
   * @apiSuccess {Integer} id Dream ID.
   * @apiSuccess {String} category Dream Category.
   * @apiSuccess {String} subcategory Dream Sub-Category.
   * @apiSuccess {Integer} user_id User related to the Dream.
   * @apiSuccess {Date} createdAt Date when the Dream was created
   * @apiSuccess {Date} updatedAt Date of the last Dream update
   *
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * [
   *  {
   *   "id": 1,
   *   "category": "movie",
   *   "subcategory": "inception",
   *   "user_id": 2,
   *   "createdAt": "2016-10-22T19:08:45.056Z",
   *   "updatedAt": "2016-10-22T19:08:45.056Z"
   *  },
   *  {
   *   "id": 2,
   *   "category": "movie",
   *   "subcategory": "the beach",
   *   "user_id": 2,
   *   "createdAt": "2016-11-22T19:08:45.056Z",
   *   "updatedAt": "2016-11-22T19:08:45.056Z"
   *  }
   * ]
   */
  app.get('/api/dreams', function(req, res, next) {
    models.Dream.findAll({
      include : [{model: models.User},{model: models.Layer}],
      where: {
        user_id: req.user_id
      }
    }).then(function(dream) {
        res.json(dream);
    })
  });

  /**
   * @api {get} api/dreams/:id/ Get a Dream
   * @apiName GetDream
   * @apiGroup Dream
   *
   * @apiSuccess {Integer} id Dream ID.
   * @apiSuccess {String} category Dream Category.
   * @apiSuccess {String} subcategory Dream Sub-Category.
   * @apiSuccess {Integer} user_id User related to the Dream.
   * @apiSuccess {Date} createdAt Date when the Dream was created
   * @apiSuccess {Date} updatedAt Date of the last Dream update
   * @apiSuccess {User} Users Related User object
   *
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   *  {
   *   "id": 1,
   *   "category": "movie",
   *   "subcategory": "inception",
   *   "user_id": 2,
   *   "createdAt": "2016-10-22T19:08:45.056Z",
   *   "updatedAt": "2016-10-22T19:08:45.056Z"
   *   "User": {
   *     "id": 2,
   *     "name": "Tailor Fontela",
   *     "firebase_key": "123456",
   *     "createdAt": "2016-10-22T18:36:55.656Z",
   *     "updatedAt": "2016-10-22T18:36:55.656Z"
   *   }
   *  }
   */
  app.get('/api/dreams/:id', function(req, res, next) {
    models.Dream.findOne({
      include : [{model: models.User},{model: models.Layer}],
      where: {
        id: req.params.id
      }
    }).then(function(dream) {
        res.json(dream);
    })
  });

  /**
   * @api {put} api/dreams/ Updating a Dream
   * @apiName EditDream
   * @apiGroup Dream
   *
   * @apiParam {Integer} id Dream ID
   * @apiParam {String} category Dream Category.
   * @apiParam {String} subcategory Dream Sub-Category.
   *
   * @apiParamExample {json} Request-Example:
   *     {
   *       "id": "1",
   *       "category": "movie",
   *       "subcategory": "inception"
   *     }
   *
   * @apiSuccess {Integer} id Dream ID.
   * @apiSuccess {String} category Dream Category.
   * @apiSuccess {String} subcategory Dream Sub-Category.
   * @apiSuccess {Integer} user_id User related to the Dream.
   * @apiSuccess {Date} createdAt Date when the Dream was created
   * @apiSuccess {Date} updatedAt Date of the last Dream update
   *
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * {
   *   "id": 1,
   *   "category": "movie",
   *   "subcategory": "inception",
   *   "user_id": 2,
   *   "createdAt": "2016-10-22T19:08:45.056Z",
   *   "updatedAt": "2016-10-22T19:08:45.056Z"
   *   }
   */
  app.put('/api/dreams', function(req, res, next) {
    models.Dream.findOne({
      attributes:  { exclude: ['UserId'] },
      where: {
        id: req.body.id
      }
    }).then(function (dream) {
      // Check if record exists in db
      if (dream) {
        dream.updateAttributes({
          category: req.body.category,
          subcategory: req.body.subcategory
        }).then(function (dream) {
          res.json(dream);
        })
      }
    })
  });

  /**
   * @api {delete} api/dreams/:id Deleting a Dream
   * @apiName DeleteDream
   * @apiGroup Dream
   *
   * @apiParam {Number} id Dream ID.
   *
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * {
   *   "success": true,
   *   "message": "Dream was successfully deleted"
   * }
   */
  app.delete('/api/dreams/:id', function(req, res, next) {
    var dream_id = req.params.id;
    models.Dream.destroy(
      {
        where: { id : dream_id }
      })
      .then(function (result) {
        if(result){
          res.send({"success": true, "message": "Dream was successfully deleted"});
        }
      }, function(rejectedPromiseError){
        res.send(rejectedPromiseError);
      });
  });
}

module.exports = dreams;
