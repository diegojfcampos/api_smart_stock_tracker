const dbSchema = {
    type: 'object',
    required: ['PORT', 'mongoDb_name', 'mongoDb_password, secret'],
    properties:{
        PORT:{type: 'string', default: 3000},
        mongoDB_name: {type: 'string'},
        mongoDB_password: {type: 'string'},
        secret: {type: 'string'}
    }
}

const dbOptions = {
    dotenv: true,
    confKey: 'config',
    schema: dbSchema,
    data: process.env
}

module.exports = dbOptions;