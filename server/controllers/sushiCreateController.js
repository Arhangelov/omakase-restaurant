const router = require('express').Router();
const { validationResult } = require("express-validator");
const { sushiAddReqValidation } = require("../middleware/sushiCreateValidation")
const { addSushi } = require('../services/sushiCrudService');


router.post('/', sushiAddReqValidation, (req, res) => {
    const errors = validationResult(req) //Saving any occurred errors.
    //If there're errors mark as Bad Request 400 and return error list.
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    else validationResult(req).throw(); //Else clear validation results and continue with the response.

    addSushi(req.body)
    .then(() => {
        res.status(201).json({message: "Successfully created."});
    }).catch(err => {
        return res.status(400).send({
            message: `${err.message}`,
            type: "ERROR"
        });
    })
});


module.exports = router;