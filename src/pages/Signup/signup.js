import React, { useState } from "react";
import "./signup.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { set } from "mongoose";

const SignUp = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState(
    "https://t4.ftcdn.net/jpg/00/97/00/09/360_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg"
  );
  const [signupField, setSignupField] = useState({
    channelName: "",
    username: "",
    password: "",
    about: "",
    profilePic: uploadedImageUrl,
  });
  const navigate = useNavigate();
  const [progressBar,setProgressBar] = useState(false);

  const handleOnChangeInput = (event, name) => {
    setSignupField({
      ...signupField,
      [name]: event.target.value,
    });
  };
  console.log(signupField);

  const uploadImage = async (e) => {
    console.log("Uploading image...");
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    //vidTube
    data.append("upload_preset", "vidTube");
    try {
      // cloudName="dbnamc7wk"
      setProgressBar(true);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dbnamc7wk/image/upload",
        data
      );
      const imageUrl = res.data.url;
      setUploadedImageUrl(imageUrl);
      setSignupField({
        ...signupField,
        profilePic: imageUrl,
      });
      setProgressBar(false);
    } catch (error) {}
  };
  const handleSignUp = async () => {
    setProgressBar(true);
    try {
      axios
        .post("http://localhost:4000/auth/signup", signupField)
        .then((res) => {
          toast.success(res.data.message);
          setProgressBar(false);
          navigate('/');
        });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="signup">
      <div className="signup_card">
        <div className="signup_title">
          <YouTubeIcon
            sx={{ fontSize: "54px", color: "red" }}
            className="youtube_icon"
          />
          SignUp
        </div>
        <div className="signup_inputs">
          <input
            type="text"
            placeholder="Channel Name"
            value={signupField.channelName}
            onChange={(e) => handleOnChangeInput(e, "channelName")}
            className="signup_input"
          />
          <input
            type="email"
            placeholder="Username"
            value={signupField.username}
            onChange={(e) => handleOnChangeInput(e, "username")}
            className="signup_input"
          />
          <input
            type="password"
            placeholder="Password"
            value={signupField.password}
            onChange={(e) => handleOnChangeInput(e, "password")}
            className="signup_input"
          />
          <input
            type="text"
            placeholder="About Your Channel"
            value={signupField.about}
            onChange={(e) => handleOnChangeInput(e, "about")}
            className="signup_input"
          />
          <div className="image_upload_signup">
            <input type="file" onChange={(e) => uploadImage(e)} />
            <div className="image_upload_signup_div">
              <img
                className="image_upload_default"
                src={uploadedImageUrl}
                alt="Unknown User"
              />
            </div>
          </div>
          <div className="signupBtns">
            <div className="signupBtn" onClick={handleSignUp}>
              SignUp
            </div>
            <Link to="/" className="signupBtn">
              Home Page
            </Link>
            {progressBar && <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>}
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default SignUp;
