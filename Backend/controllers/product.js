const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const router=express.Router();
const {Product}=require('../db')
const authenticate=require('../middleware/admin_middleware');

dotenv.config();

router.get('/',async(req,res)=>{
    try{
        const products=await Product.find({});
        res.status(200).json(products);
    }catch(e){
        return res.status(400).json({msg:'Error while finding products'});
    }
})

router.get('/:id',async(req,res)=>{
    const productId=req.params.id;
    try{
        const product=await Product.findById(productId);
        res.status(200).json(product);
    }catch(e){
        return res.status(400).json({msg:'Error while finding product'});
    }
})

//require admin middleware
router.post('/',authenticate,async(req,res)=>{
const {name,price,description,ImageURL}=req.body;
try{
    const product=await Product.create({name,price,description,ImageURL});
    const productId=await product._id;
    res.status(200).json({'Product Id':productId});
}catch(e){
    console.log(e);
    return res.status(400).json({msg:'Error while creating product'});
}
})

//require admin middleware
router.put('/:id',authenticate,async(req,res)=>{
    const {name,price,description,ImageURL}=req.body;
    const productId=req.params.id;
    try{
        const product=await Product.findByIdAndUpdate(productId,{name,price,description,ImageURL});
        res.status(200).json({msg:'Product updated successfully'});
    }catch(e){
        return res.status(400).json({msg:'Error while updating product'});
    }
})

// //require admin middleware
router.delete('/:id',authenticate,async(req,res)=>{
    try{
        const productId=req.params.id;
        const product=await Product.findByIdAndDelete(productId);
        res.status(200).json({msg:'Product deleted successfully'});
    }catch(e){
        return res.status(400).json({msg:'Error while deleting product'});
    }
})

module.exports=router;