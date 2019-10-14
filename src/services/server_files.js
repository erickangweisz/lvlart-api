const express = require('express')
const path = require('path')

//const __dirname = path.dirname(new URL(import.meta.url).pathname)

const app = express()

app.get('/lvlart-api/images/user-illustrator', (req, res) => {
    res.sendFile(path.join(__dirname, '../images', 'user-illustrator.gif'))
})
app.get('/lvlart-api/images/user-photography', (req, res) => {
    res.sendFile(path.join(__dirname, '../images', 'user-photography.gif'))
})
app.get('/lvlart-api/images/user-watcher', (req, res) => {
    res.sendFile(path.join(__dirname, '../images', 'user-watcher.gif'))
})

module.exports = app