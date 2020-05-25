const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/CategoryController')
const auth = require('../middleware/auth')


//fetch category tasks
router.get('/category/tasks', auth, CategoryController.fetchCategoryTasks);

//save category
router.post('/category/', auth,  CategoryController.saveCategory);




//fetch user category
router.get('/category/user', auth, CategoryController.fetchUserCategories);

//fetch category
router.get('/category/:id', auth, CategoryController.fetchCategories);


//update category
router.patch('/category/:id', auth, CategoryController.updateCategory);

//delete category
router.delete('/category/:id', auth, CategoryController.deleteCategory);

module.exports = router
