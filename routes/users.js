"use strict";

var models  = require('../models');

var users = function(app){
  /**
  * @api {get} api/user Get a User
  * @apiName GetUser
  * @apiGroup User
  *
  * @apiSuccessExample {json} Success-Response:
  * HTTP/1.1 200 OK
  * {
  *  "id": 2,
  *  "name": "John Doe",
  *  "firebase_key": "123456",
  *  "createdAt": "2016-10-22T18:36:55.656Z",
  *  "updatedAt": "2016-10-22T18:36:55.656Z",
  *  "Dreams": [
  *    {
  *      "id": 1,
  *      "category": "Stars",
  *      "subcategory": "Sun",
  *      "user_id": 2,
  *      "createdAt": "2016-10-22T19:08:45.056Z",
  *      "updatedAt": "2016-10-22T19:08:45.056Z"
  *    },
  *    {
  *      "id": 2,
  *      "category": "Sport",
  *      "subcategory": "Football",
  *      "user_id": 2,
  *      "createdAt": "2016-10-22T19:09:01.317Z",
  *      "updatedAt": "2016-10-22T19:09:01.317Z"
  *    }
  *    ]
  *  }
  */

  app.get('/api/user', function(req, res, next) {
    models.User.findOne({
      include : [{model: models.Dream} ],
      where: {
        id: req.user_id
      }
    }).then(function(user) {
        res.json(user);
    })
  });

  /**
  * @api {post} user Create a new User
  * @apiName CreateUser
  * @apiGroup User
  *
  * @apiParam {String} name User name.
  * @apiParam {String} firebase_key Unique Key provided by firebase.google.com service.
  * @apiParam {String} photo_url User photo URL.
  *
  * @apiParamExample {json} Request-Example:
  *     {
  *       "name": "John Doe",
  *       "firebase_key": "123123",
  *       "photo_url": "http://www.source.com/photo.jpg"
  *     }
  *
  * @apiSuccessExample {json} Success-Response:
  * HTTP/1.1 200 OK
  * {
  *  "id": 1,
  *  "name": "John Doe",
  *  "firebase_key": "123123",
  *  "photo_url": null,
  *  "createdAt": "2016-10-22T21:53:03.202Z",
  *  "updatedAt": "2016-10-22T21:53:03.202Z"
  * }
  */
  app.post('/user', function(req, res, next) {
    var firebase_key = req.body.firebase_key;
    models.User.findOne({
      where: {
        firebase_key: firebase_key
      }
    }).then(function(user) {
      if (!user) {
        models.User.create({
          name: req.body.name,
          photo_url: req.body.photo_url,
          firebase_key: firebase_key
        }).bind(user).then(function(user){
            res.json(user);
        })
      }else{
        res.json(user);
      }
    })
  });

    /**
    * @api {all requests} api/ API Authentication
    * @apiName Authenticate
    * @apiGroup Authentication
    *
    * @apiDescription The authentication strategy for all API requests used here is a header with an auth secret key.
    *
    * Our user key is the 'firebase_key' header. Use it to get proprely responses, otherwise you will get back an 403 Forbidden.
    *
    * An 'firebase_key' is storaged on the User (see how create a new user) as the unique key to identify him.
    *
    * We're using the http://firebase.google.com service to authenticate an User using their own credentials from
    * others services like Google Accounts.
    *
    * @apiHeader {String} firebase_key Unique Key provided by http://firebase.google.com service.
    *
    * @apiHeaderExample {json} Header-Example:
    *     {
    *       "firebase_key": "123123123"
    *     }
    *
    * @apiError UserNotFound The <code>firebase_key</code> of the User was not found.
    * @apiErrorExample {json} Error-Response:
    *     HTTP/1.1 403 Forbidden
    *     {
    *       "success": false,
    *       "message": "No User Key provided."
    *     }
    *
    */
}

module.exports = users;
