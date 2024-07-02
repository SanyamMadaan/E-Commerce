const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');

dotenv.config();

const authenticate=async(req,res,next)=>{
    const token=req.headers.token;
    if(!token){
        return res.status(400).json({msg:'Token missing..unauthorized'});
    }
    const originalToken=token.split(' ')[1];
    try{
        const isVerified=jwt.verify(originalToken,process.env.JWT_KEY);
        if(!isVerified){
            console.log(process.env.JWT_KEY);
            return res.status(400).json({msg:'Unauthorized access'});
        }
        next();
    }catch(e){
        console.log('inside catch');
        console.log(e);
        return res.status(400).json({msg:'Unauthorized access'});
    }   
}

module.exports=authenticate;