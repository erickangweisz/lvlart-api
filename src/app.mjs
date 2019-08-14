import express from 'express'
import config_http_headers from './middlewares/config_http_headers'
import server_files from './services/server_files'
import bodyParser from 'body-parser'
import routes from './routes'

const app = express()

app.use(config_http_headers)
app.use(server_files)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(routes)


export default app