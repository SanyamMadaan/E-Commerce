import { useState } from "react";
import Signuppic from "../assets/Signuppic.png";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const SignUpUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/authentication/register`,
        { name, email, password, phone }
      );
      if (response.status == 200) {
        localStorage.setItem("token", "Bearer " + response.data.msg);
        navigate("/home");
      }
    } catch (e) {
      console.log(e);
      alert("Error while SignUp ..Please try after some time");
    }
  };
  return (
    <div className="flex justify-center items-center bg-sky-300 h-screen">
      <div className="bg-white h-3/4 p-4 w-1/2 ml-5 lg:w-1/3 lg:h-3/4">
        <h1 className="lg:ml-10 my-2 mx-5  font-bold text-2xl">Sign Up</h1>
        <form onSubmit={SignUpUser}>
          <input
            className="placeholder-gray-500 text-black m-3 lg:w-3/4 border-2 p-2 border-black"
            type="text"
            placeholder="Your Name"
            onChange={(e) => setName(e.target.value)}
            required
          /><br/>
          <input
            className="placeholder-gray-500 text-black lg:w-3/4 m-3 border-2 p-2 border-black"
            type="text"
            placeholder="Your Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br/>
          <input
            className="placeholder-gray-500 text-black lg:w-3/4 m-3 border-2 p-2 border-black"
            type="password"
            placeholder="Your Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br/>
          <input
            className="placeholder-gray-500 text-black m-3 lg:w-3/4 border-2 p-2 border-black"
            type="text"
            placeholder="Your Mobile number"
            onChange={(e) => setPhone(e.target.value)}
            required
          /><br/>
          <button
            className="text-white bg-black rounded-sm cursor-pointer m-3 border-2 p-2 border-black w-3/4 lg:w-3/4 lg:px-4"
            type="submit"
          >
            SignUp
          </button>
        </form>
        <p className="mt-1 m-5 lg:ml-14">
          Already a user <span className="cursor-pointer underline text-purple-950 font-semibold"
            onClick={() => navigate("/")}>Log in</span>
        </p>
      </div>
      <div className="bg-white h-3/4 pt-20 w-1/2 mr-5 lg:w-1/3 lg:h-3/4">
        <img src={Signuppic} />
      </div>
    </div>
  );
}
