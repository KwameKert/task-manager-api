'use strict'
const Category = require('../model/Category')


const responseApi = (res, status, data, message)=>{
    return res.status(status).send({data, message});
}

//saving category
const saveCategory = async (req, res) => {
    const category = new Category({
        ...req.body,
        owner: req.user._id
    });
    try{
        await category.save()
        responseApi(res, 201, category, "Category saved " )
    }catch(e){
        responseApi(res, 500, null, e.message)
    }

}


//fetching all categories
const fetchCategories = async (req, res ) => {
   console.log("fetch here") 
    try{
        let categories =  await Category.find({status: {$ne: 'deleted'}});
        categories.length < 1 ? responseApi(res, 204, null, "No categories found"): 
                                responseApi(res, 200, categories, "Categories found" )
    }catch(e){
        responseApi(res, 500, null, e.message)
    }

}


//fetch user categories
const fetchUserCategories = async (req, res) => {
    console.log("user cat")
    try{
        let categories = await  Category.find({status: {$ne: 'deleted'}, owner: req.user._id}).populate('task').exec(function(error, task){
        console.log(task)
        });
        categories.length < 1 ? responseApi(res, 204, null, "No categories found"): 
                                responseApi(res, 200, categories, "Categories found" )
    }catch(e){
        responseApi(res, 500, null, e.message)
    }


}

//fetch categories with tasks
const fetchCategoryTasks = async (req, res) => {
    console.log("cat tasks here")    
    try{
        let categories = await  Category.find({status: {$ne: 'deleted'}, owner: req.user._id}).populate('tasks').exec();
        categories.length < 1 ? responseApi(res, 204, null, "No categories found"): 
                                responseApi(res, 200, categories, "Categories tasks found" )
    }catch(e){
        responseApi(res, 500, null, e.message)
    }

}


//update category
const updateCategory = async (req, res ) => {
   console.log("update category") 
    let _id = req.params.id
    try{
        let category =  await Category.findOneAndUpdate({_id}, req.body);
        responseApi(res, 200, category, "Category updated ")
    }catch(e){
        responseApi(res, 500, null, e.message);
    }


}


//deteletCategory
const deleteCategory = async (req, res) => {
    
    try{
        await Category.findOneAndUpdate({_id}, {status: 'deleted'})
        responseApi(res, 200, null, "category deleted ")
    }catch(e){
        responseApi(res, 500, null, e.message)
    }

}


module.exports = {
    saveCategory,
    fetchUserCategories,
    fetchCategoryTasks,
    fetchCategories,
    updateCategory,
    deleteCategory
}
