const mongoose = require('mongoose');

const Brand = mongoose.model('Brand', new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}));


exports.Brand = Brand;