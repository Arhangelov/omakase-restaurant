const { getPopularSushi } = require('../services/homeServices');

const router = require('express').Router();



router.post('/', (req, res) => {
    getPopularSushi(req.body)
    .then((popularProductsDTO) => {
        res.json(popularProductsDTO);
    }).catch(err => {
        return res.status(400).send({
            message: `${err.message}`,
            type: "ERROR"
        });
    })
});


module.exports = router;