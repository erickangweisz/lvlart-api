const validator = require('validator')
const bcrypt = require('bcrypt-nodejs')

const userValidator = {
    registerValidator,
    loginValidator
}

function registerValidator(req, res, next) {
    if (!validator.isLength(req.body._password, { min: 8 })) {
        return res.status(400).send({ 
            message: `password must have more than 8 characters` 
        })
    } else if (!validator.isEmail(req.body._email)) {
        return res.status(400).send({
            message: `email is not valid`
        })
    } else if (!validator.isLength(req.body._username, { min: 4 })) {
        return res.status(400).send({
            message: `username must have more than 4 characters` 
        })
    } else {
        bcrypt.hash(req.body._password, null, null, (err, hash) => {
            res.locals.hash = hash
            next()
        })
    }
}

function loginValidator(req, res, next) {
    let email = req.body['email']
    let password = req.body['password']

    console.log(email + ' - ' + password)
}

module.exports = userValidator