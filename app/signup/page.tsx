"use client"
import Link from "next/link";
import { useState } from "react";

const Signup = () => {
    const [user,setUser] = useState({
        username:"",
        email:"",
        password:""
    })
    const handelSignup = async ()=>{

    }
  return <div>

        <h1>SignUp</h1>
        <label htmlFor="username">UserName</label>
        <input 
        type="text" 
        id="username" 
        value={user.username}
        onChange={(e)=>{
            setUser({...user,username:e.target.value})
        }}
        placeholder="username"
        />
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
        onClick={handelSignup}
        >SignUp</button>
        <Link href={"/login"}>Login Here</Link>
    </div>;
};

export default Signup;
