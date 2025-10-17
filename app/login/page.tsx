"use client"
import Link from "next/link";
import { useState } from "react";

const Login = () => {
    const [user,setUser] = useState({
        email:"",
        password:""
    })
    const handelLogin = async ()=>{

    }
  return <div>

        <h1>Login</h1>
        <label htmlFor="email">email</label>
        <input 
        type="text" 
        id="email" 
        value={user.email}
        onChange={(e)=>{
            setUser({...user,email:e.target.value})
        }}
        placeholder="email"
        />
        <label htmlFor="password">password</label>
        <input 
        type="text" 
        id="password" 
        value={user.password}
        onChange={(e)=>{
            setUser({...user,password:e.target.value})
        }}
        placeholder="password"
        />
        <button
        className="p-2 "
        onClick={handelLogin}
        >Login</button>
        <Link href={"/signup"}>SignUp Here</Link>
    </div>;
};

export default Login;
