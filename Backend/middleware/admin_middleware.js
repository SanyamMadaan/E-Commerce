const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');

dotenv.config();

const authenticate=async(req,res,next)=>{
    const token=req.headers.token;
    if(!token){
        return res.status(400).json({msg:'Unauthorized access'});
    }
    const originalToken=token.split(' ')[1];
    try{
        const isVerified=jwt.verify({originalToken},process.env.JWT_KEY);
        if(!isVerified){
            return res.status(400).json({msg:'Unauthorized access'});
        }
        next();
    }catch(e){
        return res.status(400).json({msg:'Unauthorized access'});
    }   
}

module.exports=authenticate;