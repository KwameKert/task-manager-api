'use strict'
const Task = require('../model/Task')


const responseApi = (res, status, data, message)=>{
    return res.status(status).send({data, message});
}


const saveTask = async (req, res)  => {
    try{
         const task = new Task({
             ...req.body,
             owner: req.user._id
         })   
        await task.save()
        responseApi(res, 201, task, "Task added successfully ")
    }catch(e){
        responseApi(res, 500, null, e.message)
    }

}


const findTask = async (req, res ) =>{
    let _id = req.params.id;
    try{
        let task = await  Task.findOne({_id, owner: req.user._id})
        responseApi(res, 200, task, "Task found" )
    }catch(e){
        responseApi(res, 500, null, e.message)
    }
}



const updateTask = async (req, res) => {
    let _id = req.params.id
    try{
        let task = await Task.findOneAndUpdate({_id, owner: req.user._id}, req.body)
        responseApi(res, 200, task, "Task updated")
    }catch(e){
        responseApi(res, 500, null, e.message)
    }

}


const deleteTask = async (req, res) => {

    let _id = req.params.id
    try{
        let task = await Task.findOneAndDelete({_id, owner: req.user._id});
        responseApi(res, 200, task, "Task deleted")
    }catch(e){
        responseApi(res, 500, null, e.message)
    }

}


const userTasks = async (req, res) => {

    try{
        let tasks = await Task.find({owner: req.user._id});
        tasks.length > 1 ? responseApi(res, 200, tasks, "Tasks found"):
                           responseApi(res, 204, null, "No task found ")

    }catch(e){
        responseApi(res, 500, null, e.message)
    }

}



module.exports = {
    saveTask, 
    findTask,
    userTasks,
    deleteTask,
    updateTask
}
