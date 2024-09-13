const Sushi = require('../models/Sushi');

const getType = async (typeOfSushi) => {
    if(typeOfSushi == "all") {
        return Sushi.find({})
    } else {
        return  Sushi.find({ type: typeOfSushi.toLowerCase() });
    }
};

const getSushiDetails = async (id) => {
    return Sushi.findById( id )
}

module.exports = {
    getType,
    getSushiDetails
}


