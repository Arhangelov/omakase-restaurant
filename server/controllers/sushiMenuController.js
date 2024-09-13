const router = require('express').Router();
const { validationResult } = require('express-validator');
const { getTypeOfSushiReqValidation } = require("../middleware/sushiMenuValidation");
const { getType, getSushiDetails } = require("../services/sushiMenuService")

router.get("/:typeOfSushi", getTypeOfSushiReqValidation, (req, res) => {
    const errors = validationResult(req) //Saving any occurred errors.
    //If there're errors mark as Bad Request 400 and return error list.
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    else validationResult(req).throw(); //Else clear validation results and continue with the response.

    getType(req.params.typeOfSushi)
        .then(typeOfSushi => {
            res.json(typeOfSushi);
        })
})

router.get("/details/:id", (req, res) => {
    getSushiDetails(req.params.id)
        .then(sushiDetails => {
            res.json(sushiDetails);
        });
})

module.exports = router