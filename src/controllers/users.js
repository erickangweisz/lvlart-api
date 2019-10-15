const bcrypt = require('bcrypt-nodejs')
const jwt = require('../services/jwt')
const User = require('../models/user')

function register(req, res) {
    const user = new User()

    if (req.body._password) {
        bcrypt.hash(req.body._password, null, null, (err, hash) => {
            user.password = hash
        })
    } else {
        res.status(200).send({ message: `password is required` })
    }

    if (!req.body._email || !req.body._username || 
        !req.body._fullname || !req.body._category || 
        !req.body._birthday || !req.body._role) {
        res.status(500).send({ message: `all fields are required` })
    } else {
        user.email = req.body._email
        user.password = req.body._password
        user.username = req.body._username
        user.fullname = req.body._fullname
        user.category = req.body._category
        user.birthday = req.body._birthday
        user.role = req.body._role
        user.signup_date = new Date()
        user.experience = 0
        user.header_file_name = null
        user.avatar_file_name = null
        user.status_text = null
        user.visits_number = 0
        user.victories_number = 0
        user.defeats_number = 0
        user.link_to_facebook = null
        user.link_to_twitter = null
        user.link_to_deviantart = null
        user.facebook_toggle = true
        user.twitter_toggle = true
        user.deviantart_toggle = true
        user.is_active = true

        user.save((err) => {
            if (err)
                res.status(500).send({ message: `Error: ${err}` })
            
            res.status(201).send({ token: jwt.createToken(user) })
        })
    }
}

function login(req, res) {
    const email = req.body['email']
    const password = req.body['password']

    if (email && password) {
        User.findOne({ email: email.toLowerCase().trim() }, (err, user) => {
            if (err)
                res.status(500).send({ message: `Server error: ${err}` })
            else {
                if (!user)
                    res.status(404).send({ message: `email doesn't exist` })
                else {
                    bcrypt.compare(password, user.password, (err, check) => {
                        if (check) {
                            res.status(200).send({
                                token: jwt.createToken(user),
                                user: user
                            })
                        } else {
                            res.status(404).send({ message: `Password error` })
                        }
                    })
                }
            }
        })
    } else {
        res.status(500).send({ message: `email and password required to login` })
    }
}

function getUsers(req, res) {
    User.find().exec((err, users) => {
        if (err) 
            res.status(500).send({ message: `request error: ${err}` })
        else {
            if (!users) 
                res.status(404).send({ message: `there are no users` })
            else 
                res.status(200).send({ users: users })
        }
    })
}

module.exports = {
    register,
    login,
    getUsers
}