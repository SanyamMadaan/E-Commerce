const mongoose=require('mongoose');
const dotenv=require('dotenv');

dotenv.config();

const URL=process.env.DATABASE_URL;

const ConnectToDatabase=async()=>{
    try{
        const res=await mongoose.connect(URL)
        if(res){
            console.log('Database connected successfully');
        }
    }catch(e){
        console.log('Error while connecting to database');
        console.log(e);
    }
}

//defining database schema
const UserSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone:String
})

const ProductsSchema=mongoose.Schema({
    name:String,
    price:Number,
    description:String,
    ImageURL:String,
    id:String
})

const AdminSchema=mongoose.Schema({
    email:String,
    password:String
})

const CartSchema=mongoose.Schema({
    products:[{
        product:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
        quantity:Number
    }],
    total:Number,
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
})

const User=mongoose.model('User',UserSchema);
const Product=mongoose.model('Product',ProductsSchema);
const Admin=mongoose.model('Admin',AdminSchema);
const Cart=mongoose.model('Cart',CartSchema);

//calling function to connect to database
ConnectToDatabase();

//exporting models
module.exports={User,Product,Admin,Cart};