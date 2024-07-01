const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
require('./db');
const authentication=require('./controllers/authentication');
const product=require('./controllers/product');
const cart=require('./controllers/cart');

dotenv.config();//load environment variables

const port=process.env.PORT||3000;

const app=express();
//using cors middleware so that frontend and backend can easily connect with each other
app.use(cors());

//for post requests
app.use(express.json());

//passing requests to controllers
app.use('/authentication',authentication);
app.use('/products',product);
app.use('/cart',cart);

app.listen(port,()=>{
    console.log(`App is listening at PORT ${port}`);
})