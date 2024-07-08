import { useState } from "react";
import Signuppic from "../assets/Signuppic.png";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [islogin, setIslogin] = useState(false);
  const[button,setButton]=useState("Login");

  const navigate = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();
    setButton("Signing in...");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/authentication/login`,
        { email, password }
      );
      if (response.status == 200) {
        console.log(response);
        setIslogin(true);
        localStorage.setItem("token", "Bearer " + response.data.token);
        navigate("/home");
      }
    } catch (e) {
      console.log(e);
      setButton("Login");
      if(e.response.data.msg){
        alert(e.response.data.msg);
      }else{
        alert("Error while login ..Please try after some time");
      }
      
    }
  };

  return (
    <>
    <div className="flex justify-center items-center bg-black h-screen">
      <div className="bg-white md:h-3/4 p-4 md:w-1/2 ml-5 lg:w-1/3 lg:h-3/4">
        <h1 className="lg:ml-10 my-2 mx-5 text-center  font-bold text-3xl italic">Welcome Back</h1>
        <form className="flex flex-col justify-center" onSubmit={LoginUser}>
          <input
            className="placeholder-gray-500 text-black m-5 lg:mx-10 rounded-md lg:w-3/4 border-2 p-2 border-black"
            type="text"
            placeholder="Your Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            className="placeholder-gray-500 lg:mx-10 rounded-md text-black mx-5 mb-2 lg:w-3/4 border-2 p-2 border-black"
            type="password"
            placeholder="Your Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <div className="flex justify-center">
          <button className="text-white bg-black  cursor-pointer mb-4 border-2 py-2 px-1 rounded-lg border-black  w-2/4 lg:w-3/4  lg:px-4">
            {button}
          </button>

          </div>
                    
        </form>
        <p className="mb-1 m-4 ml-0  text-center">
          Don't have an account yet?{" "}
          <span
            className="cursor-pointer text-black underline font-semibold"
            onClick={() => navigate("/register")}
          >
            Sign up
          </span>
        </p>
        <div className="text-center">
          or
        </div>
        <div className="text-center">
        <p onClick={()=>navigate('/admin')}  className="text-black text-bold underline cursor-pointer">LOGIN AS ADMIN</p>
        </div>
      </div>

      <div className="invisible w-0 h-0 bg-white md:h-3/4 pt-20 md:w-1/2 md:visible lg:visible mr-5 lg:w-1/3 lg:h-3/4">
        <img src={Signuppic} />
      </div>
    </div>
    </>
  );
}
