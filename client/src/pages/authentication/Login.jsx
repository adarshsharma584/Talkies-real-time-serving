import React, { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { IoMdKey } from "react-icons/io";
import {Link} from "react-router-dom";

import {loginUserThunk} from "../../redux/user/user.thunk";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const dispatch = useDispatch();
  const { isAuthenticated, screenLoading } = useSelector(state => state.userReducer);
  const navigate = useNavigate();
const [loginData, setLoginData] = useState({
   
    username: "",
    password: "",
    
})
 const handleLogin = async (loginData) => {
  console.log("Login data:", loginData)
 const result = await  dispatch(loginUserThunk(loginData));
 console.log("Login result:", result.payload.user);
 }

const handleInputChange = (e) => {
    setLoginData(prev=> ({
        ...prev,
        [e.target.name]: e.target.value
    })) 
}
console.log(loginData);

useEffect(() => {
    if (isAuthenticated) {
      // Redirect to the home page or another page
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

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

     <button className="btn btn-primary" onClick={() => handleLogin(loginData)}>Login</button>
      <p className="text-white">Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link></p>
     </div>
    </div>
  );
}

export default Login;
