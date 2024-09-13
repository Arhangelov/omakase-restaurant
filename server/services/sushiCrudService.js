const Sushi = require('../models/Sushi');

const addSushi =  async ( data ) => {
    return new Sushi(data).save();
}; 

module.exports = {
    addSushi,
}