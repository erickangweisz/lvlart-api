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
        //console.log(req)
    })
    /*const email = req.body['email']
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
    }*/
}

module.exports = {
    register,
    login
}