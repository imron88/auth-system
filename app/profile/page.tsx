"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Profile = () => {
  const router = useRouter();
   const [data,setData] = useState("");
  const getUserData = async()=>{
    try {
      const res = await axios.get("/api/user/data");
      console.log(res.data);
      setData(res.data.user)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getUserData()
  },[])

  const logOut = async () => {
    try {
      const response = await axios.get("/api/user/logout");
      console.log("logout successfully!", response.data);
      router.push("/login");
    } catch (error) {
      console.log("logout failed!", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700 text-center">
        <h1 className="text-3xl font-bold text-white mb-6">{data.username}</h1>
        <p className="text-gray-300 mb-6">Welcome to your dashboard!</p>

        <button
          onClick={logOut}
          className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-700 transition text-white font-semibold shadow-md"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
