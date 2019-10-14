const mongoose = require('mongoose')
const chalk = require('chalk')
const app = require('./src/app')
const config = require('./src/config.js')

const apiIp = config.api.ip
const apiPort = config.api.port

const dbIp = config.db.ip
const dbPort = config.db.port
const dbDatabase = config.db.database

mongoose.set('useCreateIndex', true)
mongoose.connect(`mongodb://${dbIp}:${dbPort}/${dbDatabase}`, { useNewUrlParser: true })
    .then (() => {
        console.log('-------------------------------------------\n')
        console.log(chalk.bgGreen('Connected to MongoDB'))
    })
    .catch (err => {
        console.log(chalk.bgRed(err))
        process.exit(1)
    })

app.listen(apiPort, () => {
    console.log('\nMODE:', chalk.bgCyan(config.mode))
    console.log('API lvl-art listen on', chalk.bgCyan(`http://${apiIp}:${apiPort}\n`))
})