const mongoose = require("mongoose");

const sushiSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

    imageUrl: {
        type: String,
        require: true
    },

    description: {
        type: String,
        required: true,
        minlength: 10
    },

    type: {
        type: String,
        required: true,
    },

    portion: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Sushi", sushiSchema)