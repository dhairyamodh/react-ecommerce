const mongoose = require('mongoose');

const Checkout = mongoose.model('Checkout', new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: {
        type: Array,
        required: false
    },
    total: {
        type: Number,
        required: false
    }
}));


exports.Checkout = Checkout;