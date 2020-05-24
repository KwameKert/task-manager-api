const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController')
const auth = require('../middleware/auth')

//save task
router.post('/tasks/', auth,  TaskController.saveTask);

//fetch task
router.get('/tasks/:id', auth, TaskController.findTask);

//fetch user task
router.get('/tasks/user', auth, TaskController.userTasks);


//delete task 
router.delete('/tasks/:id', auth, TaskController.deleteTask);


//update task
router.patch('/tasks/:id', auth, TaskController.updateTask );



module.exports = router
