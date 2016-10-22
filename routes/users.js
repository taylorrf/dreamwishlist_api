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
          firebase_key: firebase_key
        }).bind(user).then(function(user){
            res.json(user);
        })
      }else{
        res.json(user);
      }
    })
  });
}

module.exports = users;
