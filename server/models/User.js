const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Sushi = require('./Sushi');

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 9,
    },

    address: {
        type: String,
        required: true,
    },

    cart: {
        products: [],

        totalPrice: {
            type: Number,
            default: 0,
        },

        sumQty: {
            type: Number,
            default: 0,
        }
    },

    purchaseHistory: []

});

userSchema.pre('save', function(next) {
    bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(this.password, salt))
    .then(hash => {
        this.password = hash;
        next();
    });
});

module.exports = mongoose.model('User', userSchema);