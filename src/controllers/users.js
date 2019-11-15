const jwt = require('../services/jwt')
const User = require('../models/user')
const userValidator = require('../middlewares/auth_validator')

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
    getUsers
}