const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({

    name: {
        type: String, 
        trim: true,
        required: true
    },
    status: {
        type: String,
        default: 'active'
    }


}, {
    timestamps: true
}


categorySchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'category'
}

const Category =  mongoose.model('Category', categorySchema);

module.exports = Category
