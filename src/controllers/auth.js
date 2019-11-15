const jwt = require('../services/jwt')
const User = require('../models/user')
const authValidator = require('../middlewares/auth_validator')

function register(req, res) {
    const user = new User({
        email: req.body._email,
        username: req.body._username,
        fullname: req.body._fullname,
        category: req.body._category,
        birthday: req.body._birthday,
        role: req.body._role,
        signup_date: new Date(),
        experience: 0,
        header_file_name: null,
        avatar_file_name: null,
        status_text: null,
        visits_number: 0,
        victories_number: 0,
        defeats_number: 0,
        link_to_facebook: null,
        link_to_twitter: null,
        link_to_deviantart: null,
        facebook_toggle: true,
        twitter_toggle: true,
        deviantart_toggle: true,
        is_active: true
    })

    authValidator.registerValidator(req, res, () => {
        let passwordHashed = res.locals.hash
        user.password = passwordHashed

        user.save((saveErr, savedUser) => {
            if (saveErr)
                res.status(500).send({ message: `Error: ${saveErr}` })
            
            res.status(201).send({ token: jwt.createToken(savedUser) })
        })
    })
}

function login(req, res) {
    authValidator.loginValidator(req, res, () => {
        const email = req.body['email'].toLowerCase().trim()

        User.findOne({ email: email.toLowerCase().trim() }, (loginErr, user) => {
            if (loginErr)
                res.status(500).send({ message: `Error: ${loginErr}` })
            
            res.status(200).send({
                token: jwt.createToken(user)
            })
        })
    })
}

module.exports = {
    register,
    login
}