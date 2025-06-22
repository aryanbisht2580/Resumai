import React,{useEffect} from "react";
import logo from "/logo.png";
import { Button } from "../ui/button";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/Services/login";
import { addUserData } from "@/features/user/userFeatures";

function Header({user}){
  const dispatch= useDispatch();
  const navigate= useNavigate();
  useEffect(()=> {
    if(user){
      console.log("use Found");
    }
    else{
      console.log("User Not Found");
    }
  },[]);

  const handleLogout=async()=>{
    try{
      const response=await logoutUser();
      if(response.statusCode==200){
        dispatch(addUserData(""));
        navigate("/");
      }
    }catch(error){
      console.log(error.message);
    }
  };

  return(
    <div
      id="printHeader"
      className="flex justify-between px-10 py-2 bg-white border-b-2 border-black items-center"
    >
      <img 
        src={logo} 
        alt="logo" 
        width={120} 
        height={120}
        className="filter grayscale"
      />
      {user?(
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="border-black text-black bg-white hover:bg-black hover:text-white transition-colors"
            onClick={()=>{
              navigate("/dashboard");
            }}
          >
            Dashboard
          </Button>
          <Button 
            className="bg-black text-white hover:bg-gray-800 border border-black"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      ):(
        <Link to="/auth/sign-in">
          <Button className="bg-black text-white hover:bg-gray-800 border border-black">
            Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
