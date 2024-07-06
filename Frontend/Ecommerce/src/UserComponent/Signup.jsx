import { useState } from "react";
import Signuppic from "../assets/Signuppic.png";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const[button,setButton]=useState("Sign Up");

  const navigate = useNavigate();

  const SignUpUser = async (e) => {
    e.preventDefault();
    setButton("Creating Account...");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/authentication/register`,
        { name, email, password, phone }
      );
      if (response.status == 200) {
        localStorage.setItem("token", "Bearer " + response.data.token);
        navigate("/home");
      }
    } catch (e) {
      setButton("Sign Up");
      console.log(e);
      alert("Error while SignUp ..Please try after some time");
    }
  };
  return (
    <div className="flex justify-center items-center bg-sky-300 h-screen">
      <div className="bg-white flex justify-center flex-col  w-2/3 md:h-5/6  rounded-lg p-3 md:w-1/2 ml-5 lg:w-1/3 lg:h-3/4">
        <h1 className="lg:ml-10 my-2 mx-5 text-center font-bold text-2xl">Sign Up</h1>
        <form className="bg-white flex flex-col justify-center lg:items-center" onSubmit={SignUpUser}>
          <input
            className="lg:m-2 lg:mb-0 lg:w-5/6 placeholder-gray-500 text-black m-2 mb-1 rounded-md  p-2   md:w-2/4 border-2 md:p-2 border-black"
            type="text"
            placeholder="Your Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br />
          <input
            className="lg:m-2 lg:mb-0 lg:w-5/6 placeholder-gray-500 text-black m-2 mb-1 rounded-md  p-2   md:w-2/4 border-2 md:p-2 border-black"
            type="text"
            placeholder="Your Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <input
            className="lg:m-2 lg:w-5/6 lg:mb-0 placeholder-gray-500 text-black m-2 mb-1 rounded-md  p-2   md:w-2/4 border-2 md:p-2 border-black"
            type="password"
            placeholder="Your Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <input
            className="lg:m-2 lg:w-5/6  placeholder-gray-500 text-black m-2 mb-1 lg:mb-0 rounded-md  p-2   md:w-2/4 border-2 md:p-2 border-black"
            type="text"
            placeholder="Your Mobile number"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <br />
          <button
            className="text-white bg-black rounded-lg cursor-pointer  lg:px-3  border-2 p-2 border-black lg:w-1/2 "
            type="submit"
          >
            {button}
          </button>
        </form>
        <p className="mt-2 lg:mt-1 text-center m-5 lg:ml-14">
          Already a user{" "}
          <span
            className="cursor-pointer underline text-purple-950 font-semibold"
            onClick={() => navigate("/")}
          >
            Log in
          </span>
        </p>
      </div>
      <div className="invisible w-0 h-0 bg-white md:h-3/4 pt-20 md:visble lg:visible md:w-1/2 mr-5 lg:w-1/3 lg:h-3/4">
        <img src={Signuppic} />
      </div>
    </div>
  );
}
