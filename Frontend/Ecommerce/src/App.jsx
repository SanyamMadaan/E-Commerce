import { Login } from './UserComponent/login'
import {Home} from './UserComponent/Home'
import { Admin_login } from './AdminComponent/AdminLogin'
import { SignUp } from './UserComponent/Signup'
import {AdminDashboard} from './AdminComponent/AdminDashboard'
import { AddProductPage } from './AdminComponent/AddProductPage'
import ProductDetail from './UserComponent/ProductDetail'
import { CartPage } from './UserComponent/CartPage'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
function App() {

  return (
    <div className='font-serif'>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/register" element={<SignUp/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/admin" element={<Admin_login/>}></Route>
        <Route path="/admindashboard" element={<AdminDashboard/>}></Route>
        <Route path="/addproduct" element={<AddProductPage/>}></Route>
        <Route path="/product/:id" element={<ProductDetail/>}></Route>
        <Route path="/cart" element={<CartPage/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
