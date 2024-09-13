const { param } = require("express-validator");
const Sushi = require("../models/Sushi");

const getTypeOfSushiReqValidation = [
    param("typeOfSushi")
        .exists({ checkFalsy: true })
        .isString()
        .withMessage("Request param 'type of sushi' should be string.")
        .isLength({ min: 3, max: 12 })
        .withMessage("Type should be between 3 and 12 characters long.")
]

module.exports = {
    getTypeOfSushiReqValidation
}