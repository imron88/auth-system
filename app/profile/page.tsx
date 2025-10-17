import axios from "axios";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const logOut = async () => {
    try {
      const response = await axios.get("/api/user/logout");
      console.log("====================================");
      console.log("logout successfully!", response.data);
      console.log("====================================");
      router.push("/login");
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };
  return (
    <div>
      Profile
      <button onClick={logOut}>LogOut</button>
    </div>
  );
};

export default Profile;
