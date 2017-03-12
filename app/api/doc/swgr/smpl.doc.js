
const paths = {
    '/api/smpl/sendMail':{
      get: {
        tags: ['SAMPLE'],
        summary: '메일보내기',
        operationId: 'jaehunpark',
        produces: ['application/json'],
        parameters: [{$ref: '#/parameters/token'}],
        responses: {
            200: {
                description: 'checkEmail',
                schema: {"$ref": "#/definitions/sendMail"}
            }
        }
      }
    },

    '/api/smpl/select':{
      get: {
        tags: ['SAMPLE'],
        summary: 'select',
        operationId: 'jaehunpark',
        produces: ['application/json'],
        parameters: [{$ref: '#/parameters/token'}],
        responses: {
            200: {
                description: 'select',
                schema: {"$ref": "#/definitions/select"}
            }
        }
      }
    },

    '/api/smpl/transaction':{
      get: {
        tags: ['SAMPLE'],
        summary: 'transaction',
        operationId: 'jaehunpark',
        produces: ['application/json'],
        parameters: [{$ref: '#/parameters/token'}],
        responses: {
            200: {
                description: 'transaction',
                schema: {"$ref": "#/definitions/transaction"}
            }
        }
      }
    },

    '/api/smpl/nested':{
      get: {
        tags: ['SAMPLE'],
        summary: 'nested',
        operationId: 'jaehunpark',
        produces: ['application/json'],
        parameters: [{$ref: '#/parameters/token'}],
        responses: {
            200: {
                description: 'nested',
                schema: {"$ref": "#/definitions/nested"}
            }
        }
      }
    },

    '/api/smpl/spread':{
      get: {
        tags: ['SAMPLE'],
        summary: 'spread',
        operationId: 'jaehunpark',
        produces: ['application/json'],
        parameters: [{$ref: '#/parameters/token'}],
        responses: {
            200: {
                description: 'spread',
                schema: {"$ref": "#/definitions/spread"}
            }
        }
      }
    },
    '/api/smpl/validation':{
      post: {
        tags: ['VALIDATION'],
        summary: 'validation',
        operationId: 'jaehunpark',
        produces: ['application/json'],
        parameters: [{$ref: '#/parameters/token'},{$ref: '#/parameters/validation'}],
        responses: {
            200: {
                description: 'validation',
                schema: {"$ref": "#/definitions/validation"}
            }
        }
      }
    },

}

const parameters = {
  token : {
    name: 'token',
    in: 'header',
    required: true,
    type: 'string',
    default: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzUsImlhdCI6MTQ4NzgyNDM0M30.CN0QFUTpJx3ORwuOfYcmQNbk6Xob36lxYH_48ZN1w9g'
  },

  validation : {
    name:'validation',
    in:'body',
    required: true,
    schema:{
      type:'object',
      properties: {
        email: {type:'string', default: 'test@test.com'}
      }
    }
  },
}

const definitions = {
  sendMail : {
    name:'sendMail',
    in:'body',
    required: true,
    schema:{
      type:'object',
      properties:{
        type : {type:'boolean'},
        statusCode : {type:'string'},
        data : {
          default : {
            resultCode : 'string',
            msg : 'string'
          }
        }
      }
    }
  },

  select : {
    name:'select',
    in:'body',
    required: true,
    schema:{
      type:'object',
      properties:{
        type : {type:'boolean'},
        statusCode : {type:'string'},
        data : {
          default : {
            // 이곳에 결과 데이터 프로퍼티를 표시하여 알려주도록함 . ex ) property : 'string'
            property1 : 'string',
            property2 : 'string',
            property3 : 'string'
          }
        }
      }
    }
  },

  transaction : {
    name:'transaction',
    in:'body',
    required: true,
    schema:{
      type:'object',
      properties:{
        type : {type:'boolean'},
        statusCode : {type:'string'},
        data : {
          default:[{
             property1 : 'string',
             property2 : 'string',
             property3 : 'string'
          }]
        }
      }
    }
  },

  nested : {
    name:'nested',
    in:'body',
    required: true,
    schema:{
      type:'object',
      properties:{
        type : {type:'boolean'},
        statusCode : {type:'string'},
        data : {
          default : {
            // 이곳에 결과 데이터 프로퍼티를 표시하여 알려주도록함 . ex ) property : 'string'
            property1 : 'string',
            property2 : 'string',
            property3 : 'string'
          }
        }
      }
    }
  },

  spread : {
    name:'spread',
    in:'body',
    required: true,
    schema:{
      type:'object',
      properties:{
        type : {type:'boolean'},
        statusCode : {type:'string'},
        data : {
          default : {
            // 이곳에 결과 데이터 프로퍼티를 표시하여 알려주도록함 . ex ) property : 'string'
            property1 : 'string',
            property2 : 'string',
            property3 : 'string',
            property4 : [{
                sub_property1 : 'string',
                sub_property2 : 'string',
                sub_property3 : 'string'
              }]
          }
        }
      }
    }
  },

  validation : {
    name:'validation',
    in:'body',
    required: true,
    schema:{
      type:'object',
      properties:{
        type : {type:'boolean'},
        statusCode : {type:'string'},
        data : {
          default : {
            // 이곳에 결과 데이터 프로퍼티를 표시하여 알려주도록함 . ex ) property : 'string'
            property1 : 'string',
            property2 : 'string',
            property3 : 'string'
          }
        }
      }
    }
  },

}

module.exports  = {
  "swagger": "2.0",
  "info": {
    "title": "JUST FOR SAMPLE",
    "description": "API 문서",
    "termsOfService": "",
    "contact": {
      "name": "JAEHUNPARK"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
    },
    "version": "1.0.0"
  },
  "host": process.env.HOME_SERVER_HOST,
  "basePath": "/",
  "schemes": [
    "https"
  ],
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  paths: paths,
  parameters: parameters,
  definitions: definitions
};
