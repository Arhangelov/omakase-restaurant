const router = require("express").Router();
const { getHistoryOfOrders, rePurchaseOrder } = require("../services/userProfileService");

router.post("/get-purchase-history", (req, res) => {
    getHistoryOfOrders(req.body)
        .then(purchaseHistory => {
            res.json(purchaseHistory);
        })
});

router.post("/re-purchase-order", (req, res) => {
    rePurchaseOrder(req.body)
        .then(cart => {
            res.json(cart);
        })
})

module.exports = router;