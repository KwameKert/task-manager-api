'use strict'
const Category = require('../model/Category')


const responseApi = (res, status, data, message)=>{
    return res.status(status).send({data, message});
}

//saving category
const saveCategory = async (req, res) => {
    const category = new Category(req.body);
    try{
        await category.save()
        responseApi(res, 201, category, "Category saved " )
    }catch(e){
        responseApi(res, 500, null, e.message)
    }

}


//fetching all categories
const fetchCategories = async (req, res ) => {
    
    try{
        let categories = Category.find({status: {$ne: 'deleted'}});
        categories.length < 1 ? responseApi(res, 204, null, "No categories found"): 
                                responseApi(res, 200, categories, "Categories found" )
    }catch(e){
        responseApi(res, 500, null, e.message)
    }

}


//fetch categories with tasks
const fetchCategoryTasks = async (req, res) => {
        
    try{
        let categories = Category.find({status: {$ne: 'deleted'}}).populate('tasks').exec();
        categories.length < 1 ? responseApi(res, 204, null, "No categories found"): 
                                responseApi(res, 200, categories, "Categories found" )
        responseApi(res, 200, categories, "Categories with tasks found");
    }catch(e){
        responseApi(res, 500, null, e.message)
    }

}


//update category
const updateCategory = async (req, res ) => {
    
    let _id = req.params.id
    try{
        await Category.findOneAndUpdate({_id}, req.body);
        responstApi(res, 200, null, "Category updated ")
    }catch(e){
        responseApi(res, 500, null, e.message);
    }


}


//deteletCategory
const deleteCategory = async (req, res) => {
    
    try{
        await Category.findOneAndDelete({_id})
        responseApi(res, 200, null, "category deleted ")
    }catch(e){
        responseApi(res, 500, null, e.message)
    }

}


module.exports = {
    saveCategory,
    fetchCategories, 
    fetchCategoryTasks,
    updateCategory,
    deleteCategory
}
