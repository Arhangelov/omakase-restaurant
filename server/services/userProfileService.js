const User = require("../models/User");

const getHistoryOfOrders = async ({ userEmail }) => {
    const user = await User.findOne({ email: userEmail });
    return user.purchaseHistory;
}

const rePurchaseOrder = async ({ cart, totalPrice, userEmail }) => {
    const user = await User.findOne({ email: userEmail });
    
    user.cart.products = [];
    user.cart.products.push(...cart);

    //Creating variable for the sum of all quantities of the products and the assign it to the cart.sumQty
    let sumQty = user.cart.products.reduce((totalQty, cartItem) => {
        return totalQty + cartItem.qty
    }, 0);
    
    user.cart.sumQty = sumQty;

    let totalPriceActual = user.cart.products.reduce((totalPrice, cartItem) => {
        return totalPrice + cartItem.price
    }, 0);

    user.cart.totalPrice = totalPriceActual;

    user.save();
    return user.cart;
}

module.exports = {
    getHistoryOfOrders,
    rePurchaseOrder
}