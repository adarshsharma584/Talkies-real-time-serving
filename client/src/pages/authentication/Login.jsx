import React, { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { IoMdKey } from "react-icons/io";
import {Link} from "react-router-dom";
function Login() {

const [signupData, setSignupData] = useState({
   
    username: "",
    password: "",
    
})

const handleInputChange = (e) => {
    setSignupData(prev=> ({
        ...prev,
        [e.target.name]: e.target.value
    })) 
}
console.log(signupData);
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen bg-zinc-600">
     <div className="flex flex-col gap-4 justify-center items-center bg-zinc-800 p-8 rounded-lg shadow-lg w-96"> 
        <h1 className="text-2xl font-bold">Login</h1>
      
      <label className="input validator">
       <FaCircleUser />
        <input
          type="text"
          required
          placeholder="Username"
          name="username"
          onChange={handleInputChange}
        />
      </label>
      <label className="input validator">
       <IoMdKey />
        <input
          type="text"
          required
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
        />
      </label>
      
     <button className="btn btn-primary">Login</button>
      <p className="text-white">Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link></p>
     </div>
    </div>
  );
}

export default Login;
