define({ "api": [  {    "type": "all requests",    "url": "api/",    "title": "API Authentication",    "name": "Authenticate",    "group": "Authentication",    "description": "<p>The authentication strategy for all API requests used here is a header with an auth secret key.</p> <p>Our user key is the 'firebase_key' header. Use it to get proprely responses, otherwise you will get back an 403 Forbidden.</p> <p>An 'firebase_key' is storaged on the User (see how create a new user) as the unique key to identify him.</p> <p>We're using the http://firebase.google.com service to authenticate an User using their own credentials from others services like Google Accounts.</p>",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "firebase_key",            "description": "<p>Unique Key provided by http://firebase.google.com service.</p>"          }        ]      },      "examples": [        {          "title": "Header-Example:",          "content": "{\n  \"firebase_key\": \"123123123\"\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "UserNotFound",            "description": "<p>The <code>firebase_key</code> of the User was not found.</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\": false,\n  \"message\": \"No User Key provided.\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "dreamwishlist_api/routes/users.js",    "groupTitle": "Authentication"  },  {    "type": "get",    "url": "api/dreams/",    "title": "All Dreams",    "name": "AllDream",    "group": "Dream",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Integer",            "optional": false,            "field": "id",            "description": "<p>Dream ID.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "category",            "description": "<p>Dream Category.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "subcategory",            "description": "<p>Dream Sub-Category.</p>"          },          {            "group": "Success 200",            "type": "Integer",            "optional": false,            "field": "user_id",            "description": "<p>User related to the Dream.</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "createdAt",            "description": "<p>Date when the Dream was created</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "updatedAt",            "description": "<p>Date of the last Dream update</p>"          },          {            "group": "Success 200",            "type": "User",            "optional": false,            "field": "User",            "description": "<p>Dream's object user</p>"          },          {            "group": "Success 200",            "type": "Layers",            "optional": false,            "field": "Layer",            "description": "<p>Layers objects related to the Dream</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n[\n {\n   \"id\": 2,\n   \"category\": \"movie\",\n   \"subcategory\": \"inception\",\n   \"user_id\": 1,\n   \"createdAt\": \"2016-10-22T21:54:44.308Z\",\n   \"updatedAt\": \"2016-10-22T21:54:44.308Z\",\n   \"User\": {\n     \"id\": 1,\n     \"name\": \"John Doe\",\n     \"firebase_key\": \"123123\",\n     \"photo_url\": null,\n     \"createdAt\": \"2016-10-22T21:53:03.202Z\",\n     \"updatedAt\": \"2016-10-22T21:53:03.202Z\"\n   },\n   \"Layers\": [\n     {\n       \"id\": 3,\n       \"type\": \"product\",\n       \"description\": \"Inception DVD\",\n       \"url\": \"http://assets.ru/product.jpg\",\n       \"product_id\": \"332\",\n       \"dream_id\": 2,\n       \"user_id\": 1,\n       \"createdAt\": \"2016-10-23T02:48:22.602Z\",\n       \"updatedAt\": \"2016-10-23T02:48:22.602Z\"\n     }\n   ]\n },\n {\n  \"id\": 2,\n  \"category\": \"movie\",\n  \"subcategory\": \"the beach\",\n  \"user_id\": 2,\n  \"createdAt\": \"2016-11-22T19:08:45.056Z\",\n  \"updatedAt\": \"2016-11-22T19:08:45.056Z\",\n   \"User\": {\n     \"id\": 1,\n     \"name\": \"John Doe\",\n     \"firebase_key\": \"123123\",\n     \"photo_url\": null,\n     \"createdAt\": \"2016-10-22T21:53:03.202Z\",\n     \"updatedAt\": \"2016-10-22T21:53:03.202Z\"\n   },\n   \"Layers\": []\n }\n]",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "dreamwishlist_api/routes/dreams.js",    "groupTitle": "Dream"  },  {    "type": "post",    "url": "api/dreams",    "title": "Create a Dream",    "name": "CreateDream",    "group": "Dream",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "category",            "description": "<p>Dream category.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "subcategory",            "description": "<p>Dream subcategory.</p>"          }        ]      },      "examples": [        {          "title": "Request-Example:",          "content": "{\n \"category\": \"Sport\",\n \"subcategory\": \"Football\"\n}",          "type": "json"        }      ]    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"category\": \"movie\",\n  \"subcategory\": \"inception\",\n  \"user_id\": 2,\n  \"createdAt\": \"2016-10-22T19:08:45.056Z\",\n  \"updatedAt\": \"2016-10-22T19:08:45.056Z\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "dreamwishlist_api/routes/dreams.js",    "groupTitle": "Dream"  },  {    "type": "delete",    "url": "api/dreams/:id",    "title": "Deleting a Dream",    "name": "DeleteDream",    "group": "Dream",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>Dream ID.</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"message\": \"Dream was successfully deleted\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "dreamwishlist_api/routes/dreams.js",    "groupTitle": "Dream"  },  {    "type": "put",    "url": "api/dreams/",    "title": "Updating a Dream",    "name": "EditDream",    "group": "Dream",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Integer",            "optional": false,            "field": "id",            "description": "<p>Dream ID</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "category",            "description": "<p>Dream Category.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "subcategory",            "description": "<p>Dream Sub-Category.</p>"          }        ]      },      "examples": [        {          "title": "Request-Example:",          "content": "{\n  \"id\": \"1\",\n  \"category\": \"movie\",\n  \"subcategory\": \"inception\"\n}",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Integer",            "optional": false,            "field": "id",            "description": "<p>Dream ID.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "category",            "description": "<p>Dream Category.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "subcategory",            "description": "<p>Dream Sub-Category.</p>"          },          {            "group": "Success 200",            "type": "Integer",            "optional": false,            "field": "user_id",            "description": "<p>User related to the Dream.</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "createdAt",            "description": "<p>Date when the Dream was created</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "updatedAt",            "description": "<p>Date of the last Dream update</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"category\": \"movie\",\n  \"subcategory\": \"inception\",\n  \"user_id\": 2,\n  \"createdAt\": \"2016-10-22T19:08:45.056Z\",\n  \"updatedAt\": \"2016-10-22T19:08:45.056Z\"\n  }",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 404 Not Found\n{\n  \"success\": false,\n  \"message\": \"Dream not found to the provided ID #1212\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "dreamwishlist_api/routes/dreams.js",    "groupTitle": "Dream"  },  {    "type": "get",    "url": "api/dreams/:id/",    "title": "Get a Dream",    "name": "GetDream",    "group": "Dream",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Integer",            "optional": false,            "field": "id",            "description": "<p>Dream ID.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "category",            "description": "<p>Dream Category.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "subcategory",            "description": "<p>Dream Sub-Category.</p>"          },          {            "group": "Success 200",            "type": "Integer",            "optional": false,            "field": "user_id",            "description": "<p>User related to the Dream.</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "createdAt",            "description": "<p>Date when the Dream was created</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "updatedAt",            "description": "<p>Date of the last Dream update</p>"          },          {            "group": "Success 200",            "type": "User",            "optional": false,            "field": "Users",            "description": "<p>Related User object</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n {\n  \"id\": 1,\n  \"category\": \"movie\",\n  \"subcategory\": \"inception\",\n  \"user_id\": 2,\n  \"createdAt\": \"2016-10-22T19:08:45.056Z\",\n  \"updatedAt\": \"2016-10-22T19:08:45.056Z\"\n  \"User\": {\n    \"id\": 2,\n    \"name\": \"Tailor Fontela\",\n    \"firebase_key\": \"123456\",\n    \"createdAt\": \"2016-10-22T18:36:55.656Z\",\n    \"updatedAt\": \"2016-10-22T18:36:55.656Z\"\n  }\n }",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "dreamwishlist_api/routes/dreams.js",    "groupTitle": "Dream"  },  {    "type": "get",    "url": "feed/dreams/",    "title": "Feed all Dreams",    "name": "FeedAllDream",    "group": "Feed",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Integer",            "optional": false,            "field": "id",            "description": "<p>Dream ID.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "category",            "description": "<p>Dream Category.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "subcategory",            "description": "<p>Dream Sub-Category.</p>"          },          {            "group": "Success 200",            "type": "Integer",            "optional": false,            "field": "user_id",            "description": "<p>User related to the Dream.</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "createdAt",            "description": "<p>Date when the Dream was created</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "updatedAt",            "description": "<p>Date of the last Dream update</p>"          },          {            "group": "Success 200",            "type": "User",            "optional": false,            "field": "User",            "description": "<p>Dream's object user</p>"          },          {            "group": "Success 200",            "type": "Layers",            "optional": false,            "field": "Layer",            "description": "<p>Layers objects related to the Dream</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n[\n {\n  \"id\": 2,\n  \"category\": \"movie\",\n  \"subcategory\": \"the beach\",\n  \"user_id\": 2,\n  \"createdAt\": \"2016-11-22T19:08:45.056Z\",\n  \"updatedAt\": \"2016-11-22T19:08:45.056Z\",\n   \"User\": {\n     \"id\": 1,\n     \"name\": \"John Doe\",\n     \"firebase_key\": \"123123\",\n     \"photo_url\": null,\n     \"createdAt\": \"2016-10-22T21:53:03.202Z\",\n     \"updatedAt\": \"2016-10-22T21:53:03.202Z\"\n   },\n   \"Layers\": [\n     {\n       \"id\": 3,\n       \"type\": \"product\",\n       \"description\": \"Inception DVD\",\n       \"url\": \"http://assets.ru/product.jpg\",\n       \"product_id\": \"332\",\n       \"dream_id\": 2,\n       \"user_id\": 1,\n       \"createdAt\": \"2016-10-23T02:48:22.602Z\",\n       \"updatedAt\": \"2016-10-23T02:48:22.602Z\"\n     }\n   ]\n },\n {\n   \"id\": 1,\n   \"category\": \"movie\",\n   \"subcategory\": \"inception\",\n   \"user_id\": 1,\n   \"createdAt\": \"2016-10-22T21:54:44.308Z\",\n   \"updatedAt\": \"2016-10-22T21:54:44.308Z\",\n   \"User\": {\n     \"id\": 1,\n     \"name\": \"John Doe\",\n     \"firebase_key\": \"123123\",\n     \"photo_url\": null,\n     \"createdAt\": \"2016-10-22T21:53:03.202Z\",\n     \"updatedAt\": \"2016-10-22T21:53:03.202Z\"\n   },\n   \"Layers\": [\n     {\n       \"id\": 3,\n       \"type\": \"product\",\n       \"description\": \"Inception DVD\",\n       \"url\": \"http://assets.ru/product.jpg\",\n       \"product_id\": \"332\",\n       \"dream_id\": 1,\n       \"user_id\": 1,\n       \"createdAt\": \"2016-10-23T02:48:22.602Z\",\n       \"updatedAt\": \"2016-10-23T02:48:22.602Z\"\n     }\n   ]\n }\n]",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "dreamwishlist_api/routes/feeds.js",    "groupTitle": "Feed"  },  {    "type": "get",    "url": "api/layers/dream/:id",    "title": "All Layer of a Dream",    "name": "AllLayer",    "group": "Layer",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Integer",            "optional": false,            "field": "id",            "description": "<p>Layer id.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "type",            "description": "<p>Layer type.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "description",            "description": "<p>Layer description.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "url",            "description": "<p>Assets URL.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "product_id",            "description": "<p>Shopify Product ID.</p>"          },          {            "group": "Success 200",            "type": "Integer",            "optional": false,            "field": "dream_id",            "description": "<p>Dream id.</p>"          },          {            "group": "Success 200",            "type": "Integer",            "optional": false,            "field": "user_id",            "description": "<p>User id.</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "createdAt",            "description": "<p>Date when the Layer was created</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "updatedAt",            "description": "<p>Date of the last Layer update</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n[\n {\n   \"id\": 1,\n   \"type\": \"video\",\n   \"description\": \"Dance Dream\",\n   \"url\": \"oi123lsa\",\n   \"product_id\": \"\",\n   \"dream_id\": 1,\n   \"user_id\": 2,\n   \"createdAt\": \"2016-11-22T21:05:23.052Z\",\n   \"updatedAt\": \"2016-11-22T21:05:23.052Z\"\n },\n {\n   \"id\": 2,\n   \"type\": \"product\",\n   \"description\": \"Life Dream\",\n   \"url\": \"http://assets.ru/product.jpg\",\n   \"product_id\": 332,\n   \"dream_id\": 1,\n   \"user_id\": 2,\n   \"createdAt\": \"2016-10-22T21:05:23.052Z\",\n   \"updatedAt\": \"2016-10-22T21:05:23.052Z\"\n }\n]",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "dreamwishlist_api/routes/layers.js",    "groupTitle": "Layer"  },  {    "type": "post",    "url": "api/layers",    "title": "Create a Layer",    "name": "CreateLayer",    "group": "Layer",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Integer",            "optional": false,            "field": "dream_id",            "description": "<p>Dream ID related to the Layer.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "type",            "description": "<p>Layer type.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "description",            "description": "<p>Layer description.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "url",            "description": "<p>Assets URL.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "product_id",            "description": "<p>Shopify Product ID.</p>"          }        ]      },      "examples": [        {          "title": "Request-Example:",          "content": "{\n \"dream_id\": 1,\n \"type\": \"product\",\n \"description\": \"Life Dream\",\n \"url\": \"http://assets.ru/product.jpg\",\n \"product_id\": \"332\"\n}",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Integer",            "optional": false,            "field": "id",            "description": "<p>Layer id.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "type",            "description": "<p>Layer type.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "description",            "description": "<p>Layer description.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "url",            "description": "<p>Assets URL.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "product_id",            "description": "<p>Shopify Product ID.</p>"          },          {            "group": "Success 200",            "type": "Integer",            "optional": false,            "field": "dream_id",            "description": "<p>Dream id.</p>"          },          {            "group": "Success 200",            "type": "Integer",            "optional": false,            "field": "user_id",            "description": "<p>User id.</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "createdAt",            "description": "<p>Date when the Layer was created</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "updatedAt",            "description": "<p>Date of the last Layer update</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n   \"id\": 1,\n   \"type\": \"product\",\n   \"description\": \"Life Dream\",\n   \"url\": \"http://assets.ru/product.jpg\",\n   \"dream_id\": 1,\n   \"product_id\": 332,\n   \"user_id\": 2,\n   \"updatedAt\": \"2016-10-22T21:05:23.052Z\",\n   \"createdAt\": \"2016-10-22T21:05:23.052Z\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "dreamwishlist_api/routes/layers.js",    "groupTitle": "Layer"  },  {    "type": "delete",    "url": "api/layers/:id",    "title": "Deleting a Layer",    "name": "DeleteLayer",    "group": "Layer",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>Layer ID.</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"message\": \"Layer was successfully deleted\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "dreamwishlist_api/routes/layers.js",    "groupTitle": "Layer"  },  {    "type": "put",    "url": "api/layers/",    "title": "Updating a Layer",    "name": "EditLayer",    "group": "Layer",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Integer",            "optional": false,            "field": "id",            "description": "<p>Layer id.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "type",            "description": "<p>Layer type.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "description",            "description": "<p>Layer description.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "url",            "description": "<p>Assets URL.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "product_id",            "description": "<p>Shopify Product ID.</p>"          },          {            "group": "Parameter",            "type": "Integer",            "optional": false,            "field": "dream_id",            "description": "<p>Dream id.</p>"          },          {            "group": "Parameter",            "type": "Integer",            "optional": false,            "field": "user_id",            "description": "<p>User id.</p>"          }        ]      },      "examples": [        {          "title": "Request-Example:",          "content": "{\n  \"id\": 1,\n  \"type\": \"video\",\n  \"description\": \"Dance Dream\",\n  \"url\": \"oi123lsa\",\n  \"product_id\": \"\",\n  \"dream_id\": 1,\n  \"user_id\": 2\n}",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Integer",            "optional": false,            "field": "id",            "description": "<p>Layer id.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "type",            "description": "<p>Layer type.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "description",            "description": "<p>Layer description.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "url",            "description": "<p>Assets URL.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "product_id",            "description": "<p>Shopify Product ID.</p>"          },          {            "group": "Success 200",            "type": "Integer",            "optional": false,            "field": "dream_id",            "description": "<p>Dream id.</p>"          },          {            "group": "Success 200",            "type": "Integer",            "optional": false,            "field": "user_id",            "description": "<p>User id.</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "createdAt",            "description": "<p>Date when the Layer was created</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "updatedAt",            "description": "<p>Date of the last Layer update</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n {\n   \"id\": 1,\n   \"type\": \"video\",\n   \"description\": \"Dance Dream\",\n   \"url\": \"oi123lsa\",\n   \"product_id\": \"\",\n   \"dream_id\": 1,\n   \"user_id\": 2,\n   \"createdAt\": \"2016-11-22T21:05:23.052Z\",\n   \"updatedAt\": \"2016-11-22T21:05:23.052Z\"\n }",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 404 Not Found\n{\n  \"success\": false,\n  \"message\": \"Layer not found to the provided ID #1212\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "dreamwishlist_api/routes/layers.js",    "groupTitle": "Layer"  },  {    "type": "get",    "url": "api/layers/:id",    "title": "Get a Layer",    "name": "GetLayer",    "group": "Layer",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Integer",            "optional": false,            "field": "id",            "description": "<p>Layer id.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "type",            "description": "<p>Layer type.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "description",            "description": "<p>Layer description.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "url",            "description": "<p>Assets URL.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "product_id",            "description": "<p>Shopify Product ID.</p>"          },          {            "group": "Success 200",            "type": "Integer",            "optional": false,            "field": "dream_id",            "description": "<p>Dream id.</p>"          },          {            "group": "Success 200",            "type": "Integer",            "optional": false,            "field": "user_id",            "description": "<p>User id.</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "createdAt",            "description": "<p>Date when the Layer was created</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "updatedAt",            "description": "<p>Date of the last Layer update</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n {\n   \"id\": 1,\n   \"type\": \"video\",\n   \"description\": \"Dance Dream\",\n   \"url\": \"oi123lsa\",\n   \"product_id\": \"\",\n   \"dream_id\": 1,\n   \"user_id\": 2,\n   \"createdAt\": \"2016-11-22T21:05:23.052Z\",\n   \"updatedAt\": \"2016-11-22T21:05:23.052Z\"\n }",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "dreamwishlist_api/routes/layers.js",    "groupTitle": "Layer"  },  {    "type": "post",    "url": "user",    "title": "Create a new User",    "name": "CreateUser",    "group": "User",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>User name.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "firebase_key",            "description": "<p>Unique Key provided by firebase.google.com service.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "photo_url",            "description": "<p>User photo URL.</p>"          }        ]      },      "examples": [        {          "title": "Request-Example:",          "content": "{\n  \"name\": \"John Doe\",\n  \"firebase_key\": \"123123\",\n  \"photo_url\": \"http://www.source.com/photo.jpg\"\n}",          "type": "json"        }      ]    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n \"id\": 1,\n \"name\": \"John Doe\",\n \"firebase_key\": \"123123\",\n \"photo_url\": null,\n \"createdAt\": \"2016-10-22T21:53:03.202Z\",\n \"updatedAt\": \"2016-10-22T21:53:03.202Z\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "dreamwishlist_api/routes/users.js",    "groupTitle": "User"  },  {    "type": "get",    "url": "api/user",    "title": "Get a User",    "name": "GetUser",    "group": "User",    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n \"id\": 2,\n \"name\": \"John Doe\",\n \"firebase_key\": \"123456\",\n \"createdAt\": \"2016-10-22T18:36:55.656Z\",\n \"updatedAt\": \"2016-10-22T18:36:55.656Z\",\n \"Dreams\": [\n   {\n     \"id\": 1,\n     \"category\": \"Stars\",\n     \"subcategory\": \"Sun\",\n     \"user_id\": 2,\n     \"createdAt\": \"2016-10-22T19:08:45.056Z\",\n     \"updatedAt\": \"2016-10-22T19:08:45.056Z\"\n   },\n   {\n     \"id\": 2,\n     \"category\": \"Sport\",\n     \"subcategory\": \"Football\",\n     \"user_id\": 2,\n     \"createdAt\": \"2016-10-22T19:09:01.317Z\",\n     \"updatedAt\": \"2016-10-22T19:09:01.317Z\"\n   }\n   ]\n }",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "dreamwishlist_api/routes/users.js",    "groupTitle": "User"  }] });
