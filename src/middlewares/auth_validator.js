const validator = require('validator')
const bcrypt = require('bcrypt-nodejs')
const User = require('../models/user')
const emailExistence = require('email-existence')

const authValidator = {
    registerValidator,
    loginValidator
}

function registerValidator(req, res, next) {
    const email = req.body._email
    const password = req.body._password
    const username = req.body._username

    if (!validator.isEmail(email)) {
        return res.status(400).send({
            message: `email is not valid`
        })
    }

    if (!validator.isLength(password, { min: 8 })) {
        return res.status(400).send({ 
            message: `password must have more than 8 characters` 
        })
    }
    
    if (!validator.isLength(username, { min: 4 })) {
        return res.status(400).send({
            message: `username must have more than 4 characters` 
        })
    }

    /*User.countDocuments({ 'username': username }, (err, post) => {
        if (post > 0) {
            return res.status(400).send({
                message: `this username is already registered` 
            })
        }    
    })*/

    emailExistence.check(email, (err, resp) => {
        if (resp) {
            return res.status(400).send({
                message: `this email is already registered`
            })
        } else {
            bcrypt.hash(password, null, null, (err, hash) => {
                res.locals.hash = hash
                next()
            })
        }
    })
}

function loginValidator(req, res, next) {
    let email = req.body['email']
    let password = req.body['password']

    if (!validator.isEmail(email)) {
        return res.status(400).send({
            message: `email is not valid`
        })
    } else if (!validator.isLength(password, { min: 8 })) {
        return res.status(400).send({ 
            message: `password must have more than 8 characters` 
        })
    } else {
        User.findOne({ email: email.toLowerCase().trim() }, (err, user) => {
            bcrypt.compare(password, user.password, (passErr, check) => {
                if (check) {
                   next()
                } else {
                    res.status(404).send({ message: `password is not correct` })
                }
            })
        })
    }
}

module.exports = authValidator