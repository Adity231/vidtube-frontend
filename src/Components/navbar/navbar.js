import React, { useState,useEffect } from "react";
import "./navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import {Link,useNavigate} from 'react-router-dom';
import Login from "../Login/login"
import axios from "axios";
import {toast,Toaster} from 'react-hot-toast';

const Navbar = ({setSideNavbarFunc,sideNavbar}) => {
  const [userPic, setUserPic] = useState(
    "https://t4.ftcdn.net/jpg/02/23/50/73/360_F_223507349_F5RFU3kL6eMt5LijOaMbWLeHUTv165CB.jpg"
  );
  const [navbarModel, setNavbarModel] = useState(false);
  const handleClickModel = () => {
    setNavbarModel(!navbarModel);
  };
  const [login,setlogin] = useState(false);
  const sideNavbarFunc = () => {
    setSideNavbarFunc(!sideNavbar);
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const handleprofile = () => {
    let userId = localStorage.getItem("userId");
    navigate(`/user/${userId}`);
    setNavbarModel(false);
  };
  const onClickPopUpOption=(button)=>{
    setNavbarModel(false);
    if(button === "login"){
        setlogin(true);
    }
    else{
        localStorage.clear();
        getLogoutFunc();
        setTimeout(() => {
          setIsLoggedIn(false);
        }, 500);
    }
  }
  const getLogoutFunc=async()=>{
    axios.post("http://localhost:4000/auth/logout",{}, {withCredentials:true}).then((res)=>{
      console.log("Logout successful ");
      window.location.reload();
    }).catch((error)=>{
      console.log(error);
    });
  }
  const setLoginModel=()=>{
    setlogin(false);
  }

useEffect(() => {
  let userProfilePic = localStorage.getItem("userProfilePic");
  setIsLoggedIn(localStorage.getItem("userId")!==null ? true : false);
  if(userProfilePic!==null){
    setUserPic(userProfilePic);
  }
},[])

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-hamburger" onClick={sideNavbarFunc}>
          <MenuIcon />
        </div>
        <Link to={"/"} className="navbar-youtubeImg">
          <YouTubeIcon
            sx={{ fontSize: "34px" }}
            className="navbar-youtubeImage"
          />
          <div className="navbar-youtubeText">VidTube</div>
        </Link>
      </div>
      <div className="navbar-middle">
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search"
            className="navbar-searchInput"
          />
          <div className="navbar-searchIconBox">
            <SearchIcon sx={{ fontSize: "28px", color: "#fff" }} />
          </div>
        </div>
        <div className="navbar-mic">
          <MicIcon sx={{ fontSize: "28px", color: "#fff" }} />
        </div>
      </div>
      <div className="navbar-right">
        <Link to={"/22/upload"} className="navbar-upload">
          <VideoCallIcon sx={{ fontSize: "28px", color: "#fff" }} />
        </Link>

        <NotificationsIcon sx={{ fontSize: "28px", color: "#fff" }} />

        <img
          onClick={handleClickModel}
          src={userPic}
          alt="User"
          className="navbar-userPic"
        />
        {navbarModel && (
          <div className="navbar-model">
            {isLoggedIn && (
              <div className="navbar-model-option" onClick={handleprofile}>
                Profile
              </div>
            )}
            {isLoggedIn && (
              <div
                className="navbar-model-option"
                onClick={() => onClickPopUpOption("logout")}
              >
                Logout
              </div>
            )}
            {!isLoggedIn && (
              <div
                className="navbar-model-option"
                onClick={() => onClickPopUpOption("login")}
              >
                Login
              </div>
            )}
          </div>
        )}
      </div>
      {login && <Login setLoginModel={setLoginModel} />}
    </div>
  );
};

export default Navbar;
