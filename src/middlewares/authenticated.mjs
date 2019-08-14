import jwt from 'jwt-simple'
import moment from 'moment'
import config from '../config'

export function ensureAuth(req, res, next) {
    if (!req.headers.authorization)
        return res.status(403).send({
            message: `The request doesn't the authentication header`
        })
    
    let token = req.headers.authorization.replace(/['"]+/g, '')

    try {
        let payload = jwt.decode(token, config.PRIVATE_KEY)
        if (payload.exp <= moment().unix())
            return res.status(401).send({ message: `Token has expired` })
    } catch (ex) {
        return res.status(404).send({ message: `Invalid Token` })
    }
    req.user = payload
    next()
}