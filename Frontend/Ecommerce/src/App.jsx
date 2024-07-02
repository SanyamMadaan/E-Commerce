import './App.css'
import { Login } from './Components/login'
import {Home} from './Components/Home'
import { Admin_login } from './Components/AdminLogin'
import { SignUp } from './Components/Signup'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/register" element={<SignUp/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/admin" element={<Admin_login/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
