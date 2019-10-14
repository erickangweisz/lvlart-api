const config = {
    mode: process.env.MODE || 'default',
    api: {
        port: process.env.API_PORT || '3087',
        ip: process.env.API_IP || 'localhost',
    },
    db: {
        port: process.env.DB_PORT || '27017',
        ip: process.env.DB_IP || '127.0.0.1',
        database: process.env.DB_DATABASE || 'lvlart-db',
    },
    privateKey: process.env.PRIVATE_KEY || 'key_secret',
}
module.exports = config