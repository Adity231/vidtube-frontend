import React,{useState} from "react";
import "./login.css"
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { set } from "mongoose";

const Login=({setLoginModel})=>{
  const [loginField, setLoginField] = useState({
    "username": "",
    "password": ""
  });
  console.log(loginField)

  const [loader, setLoader] = useState(false);
  const handleOnChangeInput=(event,name)=>{
    setLoginField({
      ...loginField,[name]:event.target.value
    })
  }

  const handleLoginfun = async () => {
    setLoader(true);
    axios.post("http://localhost:4000/auth/login", loginField,{withCredentials:true})
      .then((res) => {
        setLoader(false);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user._id);
        localStorage.setItem("userProfilePic", res.data.user.profilePic);
        toast.success(res.data.message);
        window.location.reload();
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
        toast.error("Invalid Credentials");
      });
  }
    return (
      <div className="login">
        <div className="loginCard">
          <div className="titleCard_login">
            <YouTubeIcon
              sx={{ fontSize: "54px" }}
              className="login_vidtubeImage"
            />
            Login
          </div>
          <div className="loginCredentials">
            <div className="userNameLogin">
              <input
                className="userNameLoginUserName"
                value={loginField.username}
                onChange={(e) => handleOnChangeInput(e, "username")}
                placeholder="User Name"
                type="text"
              />
            </div>
            <div className="userNameLogin">
              <input
                className="userNameLoginUserName"
                onChange={(e) => handleOnChangeInput(e, "password")}
                value={loginField.password}
                placeholder="Password"
                type="password"
              />
            </div>
          </div>
          <div className="login_buttons">
            <div className="login_btn" onClick={handleLoginfun}>
              Login
            </div>
            <Link
              to={"/signup"}
              onClick={() => setLoginModel()}
              className="login_btn"
            >
              Signup
            </Link>
            <div className="login_btn" onClick={() => setLoginModel()}>
              Cancel
            </div>
          </div>
          {loader && (
            <Box sx={{ width: "100%", margin: "15px 0" }}>
              <LinearProgress />
            </Box>
          )}
        </div>
        <Toaster position="top-center" reverseOrder={true} />
      </div>
    );
}

export default Login