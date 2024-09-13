const router = require('express').Router();
const { updateCart, getUserCart, deleteFromCart, finishOrder } = require("../services/sushiCartService");

router.post("/get-cart", (req, res) => {
    getUserCart(req.body)
        .then(cart => {
            res.json(cart);
        }).catch(err => {
            return res.status(400).send({
                message: `${err.message}`,
                type: "ERROR"
            });
        })
});

router.post("/update-cart", (req, res) => {
    updateCart(req.body)
        .then(cart => {
            res.json(cart);
        }).catch(err => {
            return res.status(400).send({
                message: `${err.message}`,
                type: "ERROR"
            });
        })
});

router.post("/delete-from-cart", (req, res) => {
    deleteFromCart(req.body)
        .then(cart => {
            res.status(200)
            .json(cart)
        }).catch(err => {
            return res.status(400).send({
                message: `${err.message}`,
                type: "ERROR"
            });
        })
});

router.post("/finish-order", (req, res) => {
    finishOrder(req.body)
        .then(purchaseHistory => {
            res.json(purchaseHistory)
        }).catch(err => {
            return res.status(400).send({
                message: `${err.message}`,
                type: "ERROR"
            });
        })
})

module.exports = router