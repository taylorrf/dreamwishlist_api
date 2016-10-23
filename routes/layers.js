/**
 * Layers Route.
 *
 * @author taylorrf
 * @version 1.0
 */

"use strict";

var models  = require('../models');

var layers = function(app){
  /**
  * @api {post} api/layers Create a Layer
  * @apiName CreateLayer
  * @apiGroup Layer
  *
  * @apiParam {Integer} dream_id Dream ID related to the Layer.
  * @apiParam {String} type Layer type.
  * @apiParam {String} description Layer description.
  * @apiParam {String} url Assets URL.
  * @apiParam {String} product_id Shopify Product ID.
  *
  * @apiParamExample {json} Request-Example:
  *  {
  *   "dream_id": 1,
  *   "type": "product",
  *   "description": "Life Dream",
  *   "url": "http://assets.ru/product.jpg",
  *   "product_id": "332"
  *  }
  *
  * @apiSuccess {Integer} id Layer id.
  * @apiSuccess {String} type Layer type.
  * @apiSuccess {String} description Layer description.
  * @apiSuccess {String} url Assets URL.
  * @apiSuccess {String} product_id Shopify Product ID.
  * @apiSuccess {Integer} dream_id Dream id.
  * @apiSuccess {Integer} user_id User id.
  * @apiSuccess {Date} createdAt Date when the Layer was created
  * @apiSuccess {Date} updatedAt Date of the last Layer update
  *
  * @apiSuccessExample {json} Success-Response:
  * HTTP/1.1 200 OK
  * {
  *    "id": 1,
  *    "type": "product",
  *    "description": "Life Dream",
  *    "url": "http://assets.ru/product.jpg",
  *    "dream_id": 1,
  *    "product_id": 332,
  *    "user_id": 2,
  *    "updatedAt": "2016-10-22T21:05:23.052Z",
  *    "createdAt": "2016-10-22T21:05:23.052Z"
  * }
  */
  app.post('/api/layers', function(req, res, next) {
    models.Layer.create({
      dream_id: req.body.dream_id,
      type: req.body.type,
      description: req.body.description,
      url: req.body.url,
      product_id: req.body.product_id,
      user_id: req.user_id
    }).then(function(layer){
        res.json(layer);
    })
  });

  /**
   * @api {get} api/layers/dream/:id All Layer of a Dream
   * @apiName AllLayer
   * @apiGroup Layer
   *
   * @apiSuccess {Integer} id Layer id.
   * @apiSuccess {String} type Layer type.
   * @apiSuccess {String} description Layer description.
   * @apiSuccess {String} url Assets URL.
   * @apiSuccess {String} product_id Shopify Product ID.
   * @apiSuccess {Integer} dream_id Dream id.
   * @apiSuccess {Integer} user_id User id.
   * @apiSuccess {Date} createdAt Date when the Layer was created
   * @apiSuccess {Date} updatedAt Date of the last Layer update
   *
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * [
   *  {
   *    "id": 1,
   *    "type": "video",
   *    "description": "Dance Dream",
   *    "url": "oi123lsa",
   *    "product_id": "",
   *    "dream_id": 1,
   *    "user_id": 2,
   *    "createdAt": "2016-11-22T21:05:23.052Z",
   *    "updatedAt": "2016-11-22T21:05:23.052Z"
   *  },
   *  {
   *    "id": 2,
   *    "type": "product",
   *    "description": "Life Dream",
   *    "url": "http://assets.ru/product.jpg",
   *    "product_id": 332,
   *    "dream_id": 1,
   *    "user_id": 2,
   *    "createdAt": "2016-10-22T21:05:23.052Z",
   *    "updatedAt": "2016-10-22T21:05:23.052Z"
   *  }
   * ]
   */
  app.get('/api/layers/dream/:id', function(req, res, next) {
    var dream_id = req.params.id;

    if(dream_id){
      models.Layer.findAll({
        where: {
          dream_id: dream_id
        }
      }).then(function(dream) {
          res.json(dream);
      })
    }
  });

  /**
   * @api {get} api/layers/:id Get a Layer
   * @apiName GetLayer
   * @apiGroup Layer
   *
   * @apiSuccess {Integer} id Layer id.
   * @apiSuccess {String} type Layer type.
   * @apiSuccess {String} description Layer description.
   * @apiSuccess {String} url Assets URL.
   * @apiSuccess {String} product_id Shopify Product ID.
   * @apiSuccess {Integer} dream_id Dream id.
   * @apiSuccess {Integer} user_id User id.
   * @apiSuccess {Date} createdAt Date when the Layer was created
   * @apiSuccess {Date} updatedAt Date of the last Layer update
   *
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   *  {
   *    "id": 1,
   *    "type": "video",
   *    "description": "Dance Dream",
   *    "url": "oi123lsa",
   *    "product_id": "",
   *    "dream_id": 1,
   *    "user_id": 2,
   *    "createdAt": "2016-11-22T21:05:23.052Z",
   *    "updatedAt": "2016-11-22T21:05:23.052Z"
   *  }
   */
  app.get('/api/layers/:id', function(req, res, next) {
    models.Layer.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(layer) {
        res.json(layer);
    })
  });

  /**
   * @api {put} api/layers/ Updating a Layer
   * @apiName EditLayer
   * @apiGroup Layer
   *
   * @apiParam {Integer} id Layer id.
   * @apiParam {String} type Layer type.
   * @apiParam {String} description Layer description.
   * @apiParam {String} url Assets URL.
   * @apiParam {String} product_id Shopify Product ID.
   * @apiParam {Integer} dream_id Dream id.
   * @apiParam {Integer} user_id User id.
   *
   * @apiParamExample {json} Request-Example:
   *  {
   *    "id": 1,
   *    "type": "video",
   *    "description": "Dance Dream",
   *    "url": "oi123lsa",
   *    "product_id": "",
   *    "dream_id": 1,
   *    "user_id": 2
   *  }
   *
   * @apiSuccess {Integer} id Layer id.
   * @apiSuccess {String} type Layer type.
   * @apiSuccess {String} description Layer description.
   * @apiSuccess {String} url Assets URL.
   * @apiSuccess {String} product_id Shopify Product ID.
   * @apiSuccess {Integer} dream_id Dream id.
   * @apiSuccess {Integer} user_id User id.
   * @apiSuccess {Date} createdAt Date when the Layer was created
   * @apiSuccess {Date} updatedAt Date of the last Layer update
   *
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   *  {
   *    "id": 1,
   *    "type": "video",
   *    "description": "Dance Dream",
   *    "url": "oi123lsa",
   *    "product_id": "",
   *    "dream_id": 1,
   *    "user_id": 2,
   *    "createdAt": "2016-11-22T21:05:23.052Z",
   *    "updatedAt": "2016-11-22T21:05:23.052Z"
   *  }
   *
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "success": false,
   *       "message": "Layer not found to the provided ID #1212"
   *     }
   */
  app.put('/api/layers', function(req, res, next) {
    models.Layer.findOne({
      attributes:  { exclude: ['UserId'] },
      where: {
        id: req.body.id
      }
    }).then(function (layer) {
      // Check if record exists in db
      if (layer) {
        layer.updateAttributes({
          dream_id: req.body.dream_id,
          type: req.body.type,
          description: req.body.description,
          url: req.body.url,
          product_id: req.body.product_id,
          user_id: req.user_id
        }).then(function (layer) {
          res.json(layer);
        })
      }else{
        res.status(404).send(
          {
            "success": false,
            "message": "Layer not found to the provided ID #"+ req.body.id
          }
        );
      }
    })
  });

  /**
   * @api {delete} api/layers/:id Deleting a Layer
   * @apiName DeleteLayer
   * @apiGroup Layer
   *
   * @apiParam {Number} id Layer ID.
   *
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * {
   *   "success": true,
   *   "message": "Layer was successfully deleted"
   * }
   */
  app.delete('/api/layers/:id', function(req, res, next) {
    var layer_id = req.params.id;
    models.Layer.destroy(
      {
        where: { id : layer_id }
      })
      .then(function (result) {
        if(result){
          res.send({"success": true, "message": "Layer was successfully deleted"});
        }
      }, function(rejectedPromiseError){
        res.send(rejectedPromiseError);
      });
  });
}

module.exports = layers;
