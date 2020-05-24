const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/CategoryController')
const auth = require('../middleware/auth')

//save category
router.post('/category/', auth,  CategoryController.saveCategory);

//fetch category
router.get('/category/:id', auth, CategoryController.fetchCategories);

//fetch category tasks
router.get('/category/task', auth, CategoryController.fetchCategoryTasks);

//update category
router.patch('/category/:id', auth, CategoryController.updateCategory);

//delete category
router.delete('/category/:id', auth, CategoryController.deleteCategory);

module.exports = router
