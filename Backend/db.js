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
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    phone:{type:String,required:true},
})

const ProductsSchema=mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    description:{type:String,required:true},
    ImageURL:{type:String,required:true},
    id:String
})

const AdminSchema=mongoose.Schema({
    email:String,
    password:String
})

const CartSchema=mongoose.Schema({
    products:[{
        product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},
        quantity:Number
    }],
    total:{type:Number,default:0},
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