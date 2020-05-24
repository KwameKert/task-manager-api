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
        responseApi(res, 400, null, e.message)
    }

}
