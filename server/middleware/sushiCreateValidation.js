const { body } = require("express-validator");
const Sushi = require("../models/Sushi");

const sushiAddReqValidation = [
    body("title")
        .exists({ checkFalsy: true })
        .withMessage("Title is required.")
        .custom(async title => {
            // Checking if the input title already exists.
            const existingSushiTitle = await Sushi.findOne({ title });
            // Rejecting the request if the sushi title already exists.
            if (existingSushiTitle) return Promise.reject(`Sushi "${title}" already exists.`);
        })
        .isLength({ min: 13, max: 60 })
        .withMessage("Title should be between 13 and 60 characters long.")
        .optional({ checkFalsy: true }),

    body("imageUrl")
        .exists({ checkFalsy: true })
        .withMessage("Image URL is required.")
        .custom(async imageUrl => {
            // Checking if the input imageUrl already exists.
            const existingSushiUrl = await Sushi.findOne({ imageUrl });
            // Rejecting the request if the sushi URL already exists.
            if (existingSushiUrl) return Promise.reject("Sushi URL already exists.");
        })
        .optional({ checkFalsy: true }),

    body("description")
        .exists({ checkFalsy: true })
        .withMessage("Description is required.")
        .custom(async description => {
            // Checking if the input title already exists.
            const existingSushiDescription = await Sushi.findOne({ description });
            // Rejecting the request if the sushi title already exists.
            if (existingSushiDescription) return Promise.reject(`Sushi description already exists.`);
        })
        .isLength({ min: 13, max: 160 })
        .withMessage("Description should be between 13 and 160 characters long."),

    body("type")
        .exists({ checkFalsy: true })
        .withMessage("Type is required.")
        .isLength({ min: 3, max: 12 })
        .withMessage("Type should be between 3 and 12 characters long.")
        .isLowercase()
        .withMessage("Type should be in lowercase."),

    body("portion")
        .exists({ checkFalsy: true })
        .withMessage("Portion is required.")
        .isLength({ min: 6, max: 12 })
        .withMessage("Portion should be between 7 and 12 characters."),
    
    body("price")
        .exists({ checkFalsy: true })
        .withMessage("Price is required.")
        .isNumeric()
        .withMessage("Price should be number.")
        .isLength({ min: 4, max: 6 })
        .withMessage("Price should be between 4 and 6 characters.")
]

module.exports = {
    sushiAddReqValidation,
}
