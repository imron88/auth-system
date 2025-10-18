"use client"
import axios from "axios";
import { useState } from "react"

const Profile = () => {
  const [data,setData] = useState("");
  const getUserData = async()=>{
    try {
      const res = await axios.get("/api/user/data");
      console.log(res.data);
      setData(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>Profile</div>
  )
}

export default Profile