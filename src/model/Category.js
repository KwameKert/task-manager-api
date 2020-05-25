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
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    }


}, {
    timestamps: true
})


categorySchema.virtual('task', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'category'
})

const Category =  mongoose.model('Category', categorySchema);

module.exports = Category
