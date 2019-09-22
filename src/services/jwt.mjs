import jwt from 'jwt-simple'
import moment from 'moment'
import config from '../config'

export function createToken(user) {
    const payload = {
        sub: user._id,
        email: user.email,
        username: user.username,
        fullname: user.fullname,
        category: user.category,
        birthday: user.birthday,
        role: user.role,
        iat: moment().unix(), // creation date of the token
        exp: moment().add(30, 'days').unix() // time token expiration
    }
    return jwt.encode(payload, config.privateKey)
}