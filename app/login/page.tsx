"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
    const router = useRouter();
    const [user,setUser] = useState({
        email:"",
        password:""
    })
    const handelLogin = async ()=>{
        try {
      const response = await axios.post("/api/user/login", user);
      console.log("signup successfully!", response.data);
      router.push("/login");
    } catch (error) {
      console.log("signup failed!", error);
    }
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
