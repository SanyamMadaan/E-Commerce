import { useState } from "react";
import Signuppic from "../assets/Signuppic.png";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [islogin, setIslogin] = useState(false);

  const navigate = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/authentication/login`,
        { email, password }
      );
      if (response.status == 200) {
        setIslogin(true);
        localStorage.setItem("token", "Bearer " + response.data.msg);
        navigate("/home");
      }
    } catch (e) {
      console.log(e);
      if(e.response.data.msg){
        alert(e.response.data.msg);
      }else{
        alert("Error while login ..Please try after some time");
      }
      
    }
  };

  return (
    <>
    <div className="m-0 bg-sky-300 fixed right-1 top-2">
      <button onClick={()=>navigate('/admin')} className="bg-black text-white p-2 border-1 rounded-md">LOGIN AS ADMIN</button>
    </div>
    <div className="flex justify-center items-center bg-sky-300 h-screen">
      <div className="bg-white h-3/4 p-4 w-1/2 ml-5 lg:w-1/3 lg:h-3/4">
        <h1 className="lg:ml-10 my-2 mx-5  font-bold text-2xl">Welcome Back</h1>
        <form onSubmit={LoginUser}>
          <input
            className="placeholder-gray-500 text-black m-5 lg:w-3/4 border-2 p-2 border-black"
            type="text"
            placeholder="Your Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            className="placeholder-gray-500 text-black m-5 lg:w-3/4 border-2 p-2 border-black"
            type="password"
            placeholder="Your Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="text-white bg-black rounded-sm cursor-pointer m-5 border-2 p-2 border-black w-3/4 lg:w-3/4 lg:px-4">
            Log in
          </button>
        </form>
        <p className="mt-1 m-4 lg:ml-10">
          Don't have an account yet?{" "}
          <span
            className="cursor-pointer underline text-purple-950 font-semibold"
            onClick={() => navigate("/register")}
          >
            Sign up
          </span>
        </p>
      </div>

      <div className="bg-white h-3/4 pt-20 w-1/2 mr-5 lg:w-1/3 lg:h-3/4">
        <img src={Signuppic} />
      </div>
    </div>
    </>
  );
}
