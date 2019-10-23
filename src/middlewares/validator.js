const validator = require('validator')

function lengthGreaterThan6(stringToValidate) {
    if (validator.isLength(stringToValidate, { min: 6 }))
        return true
}

module.exports = {
    lengthGreaterThan6
}