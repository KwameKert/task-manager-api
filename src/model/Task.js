const mongoose = require('mongoose')



const taskSchema = new mongoose.Schema({

    description: {
        type: String, 
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'ongoing', 'completed'],
        default: 'pending'
    },
    dueDate: {
        type: Date,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }

},{
    timestamps: true
}) 



const Task = mongoose.model('Task',  taskSchema)

module.exports = Task
