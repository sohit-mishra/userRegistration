const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
})

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;