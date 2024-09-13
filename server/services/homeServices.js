const { default: mongoose } = require('mongoose');
const Sushi = require('../models/Sushi');


const getPopularSushi = async ( popularProducts ) => {
    const product1 = await Sushi.findById(popularProducts[0]);
    const product2 = await Sushi.findById(popularProducts[1]);
    const product3 = await Sushi.findById(popularProducts[2]);

    const popularProductsDTO = {
        product1,
        product2,
        product3
    }

    return popularProductsDTO;
}



module.exports = {
    getPopularSushi
}