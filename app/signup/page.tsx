"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Signup = () => {
    const router = useRouter()
    const [user,setUser] = useState({
        username:"",
        email:"",
        password:""
    })
    const handelSignup = async ()=>{
        try {
            const response = await axios.post("/api/user/signup",()=>{
                user
            })
            console.log('====================================');
            console.log("signup sucessfully!",response.data);
            console.log('====================================');
            router.push("/login");
        } catch (error) {
            console.log('====================================');
            console.log("signup failed!",error);
            console.log('====================================');
        }
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
