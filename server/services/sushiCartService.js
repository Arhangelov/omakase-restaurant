const Sushi = require('../models/Sushi');
const User = require("../models/User");

const getUserCart = async ({ userEmail }) => {
    const user = await User.findOne({ email: userEmail });
    return user.cart
}

const updateCart = async ({ sushiProduct, userEmail }) => {
    const user = await User.findOne({ email: userEmail });
    const currentSushi = user.cart.products.find((s) => s.id === sushiProduct.id);

    //Check if sushi already exist in the cart and updates the quantity
    if (currentSushi) {
        user.cart.products.remove(currentSushi);
        user.cart.products.push(sushiProduct);
    } else {
        user.cart.products.push(sushiProduct);
    }

    //Creating variable for the sum of all quantities of the products and the assign it to the cart.sumQty
    let sumQty = user.cart.products.reduce((totalQty, cartItem) => {
        return totalQty + cartItem.qty
    }, 0)

    //Creating variable for Total Price and then assign it to the cart.totalPrice
    let totalPrice = user.cart.products.reduce((total, cartItem) => {
        return total + cartItem.price * cartItem.qty
    }, 0).toFixed(2);

    user.cart.sumQty = sumQty
    user.cart.totalPrice = totalPrice;

    await user.save();
    return user.cart;
}

const deleteFromCart = async ({ sushiId, userEmail }) => {
    const user = await User.findOne({ email: userEmail });
    user.cart.products = user.cart.products.filter(sushi => sushi.id !== sushiId);

    let totalPrice = user.cart.products.reduce((total, cartItem) => {
        return total + cartItem.price * cartItem.qty
    }, 0).toFixed(2);

    user.cart.totalPrice = totalPrice;

    let sumQty = user.cart.products.reduce((totalQty, cartItem) => {
        return totalQty + cartItem.qty
    }, 0);

    user.cart.sumQty = sumQty;

    user.save();
    return user.cart;
}

const finishOrder = async({ userEmail }) => {
    const showDate = new Date();
    const currDate = showDate.getDate()+"/"+(showDate.getMonth()+1);

    const user = await User.findOne({ email: userEmail });
    const cart = user.cart.products;
    const totalPrice = user.cart.totalPrice

    if(cart.length != 0) {
        user.purchaseHistory.push({ currDate, cart, totalPrice });
        user.cart.products = [];
        user.cart.totalPrice = 0;
        user.cart.sumQty = 0;
    } else {
        throw new Error("The cart is empty.")
    }

    return await user.save()
}
module.exports = {
    updateCart,
    getUserCart,
    deleteFromCart,
    finishOrder
}