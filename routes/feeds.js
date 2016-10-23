/**
 * Feeds Route.
 *
 * @author taylorrf
 * @version 1.0
 */

"use strict";

var models  = require('../models');

var feeds = function(app){
  /**
   * @api {get} feed/dreams/ Feed all Dreams
   * @apiName FeedAllDream
   * @apiGroup Feed
   *
   * @apiSuccess {Integer} id Dream ID.
   * @apiSuccess {String} category Dream Category.
   * @apiSuccess {String} subcategory Dream Sub-Category.
   * @apiSuccess {Integer} user_id User related to the Dream.
   * @apiSuccess {Date} createdAt Date when the Dream was created
   * @apiSuccess {Date} updatedAt Date of the last Dream update
   * @apiSuccess {User} User Dream's object user
   * @apiSuccess {Layers} Layer Layers objects related to the Dream
   *
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * [
   *  {
   *   "id": 2,
   *   "category": "movie",
   *   "subcategory": "the beach",
   *   "user_id": 2,
   *   "createdAt": "2016-11-22T19:08:45.056Z",
   *   "updatedAt": "2016-11-22T19:08:45.056Z",
   *    "User": {
   *      "id": 1,
   *      "name": "John Doe",
   *      "firebase_key": "123123",
   *      "photo_url": null,
   *      "createdAt": "2016-10-22T21:53:03.202Z",
   *      "updatedAt": "2016-10-22T21:53:03.202Z"
   *    },
   *    "Layers": [
   *      {
   *        "id": 3,
   *        "type": "product",
   *        "description": "Inception DVD",
   *        "url": "http://assets.ru/product.jpg",
   *        "product_id": "332",
   *        "dream_id": 2,
   *        "user_id": 1,
   *        "createdAt": "2016-10-23T02:48:22.602Z",
   *        "updatedAt": "2016-10-23T02:48:22.602Z"
   *      }
   *    ]
   *  },
   *  {
   *    "id": 1,
   *    "category": "movie",
   *    "subcategory": "inception",
   *    "user_id": 1,
   *    "createdAt": "2016-10-22T21:54:44.308Z",
   *    "updatedAt": "2016-10-22T21:54:44.308Z",
   *    "User": {
   *      "id": 1,
   *      "name": "John Doe",
   *      "firebase_key": "123123",
   *      "photo_url": null,
   *      "createdAt": "2016-10-22T21:53:03.202Z",
   *      "updatedAt": "2016-10-22T21:53:03.202Z"
   *    },
   *    "Layers": [
   *      {
   *        "id": 3,
   *        "type": "product",
   *        "description": "Inception DVD",
   *        "url": "http://assets.ru/product.jpg",
   *        "product_id": "332",
   *        "dream_id": 1,
   *        "user_id": 1,
   *        "createdAt": "2016-10-23T02:48:22.602Z",
   *        "updatedAt": "2016-10-23T02:48:22.602Z"
   *      }
   *    ]
   *  }
   * ]
   */
  app.get('/feed/dreams', function(req, res, next) {
    models.Dream.findAll({
      order: '"createdAt" DESC',
      include : [{model: models.User},{model: models.Layer}]
    }).then(function(dream) {
        res.json(dream);
    })
  });
}

module.exports = feeds;
