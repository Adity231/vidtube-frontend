import React,{useState,useEffect} from 'react';
import './videoUpload.css'
import YouTubeIcon from "@mui/icons-material/YouTube";
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { set } from 'mongoose';
const VideoUpload = () => {
  const [inputFields, setInputFields] = useState({
    "title": "",
    "description": "",
    "category": "",
    "thumbnail": "",
    "url": ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleOnChangeInput = (event, name) => {
    setInputFields({
      ...inputFields,
      [name]: event.target.value,
    });
      };
   const uploadImage = async (e,type) => {
    setLoading(true);
     console.log("Uploading...");
     const files = e.target.files;
     const data = new FormData();
     data.append("file", files[0]);
     //vidTube
     data.append("upload_preset", "vidTube");
     try {

       // cloudName="dbnamc7wk"
       const res = await axios.post(
         `https://api.cloudinary.com/v1_1/dbnamc7wk/${type}/upload`,
         data
       );
       const url = res.data.secure_url;
        setLoading(false);
       let val = type === "image" ? "thumbnail" : "url";
       setInputFields({
         ...inputFields,
         [val]: url,
       });

     } catch (error) {
       setLoading(false);
       console.log(error);
     }
   };
   console.log(inputFields);
   useEffect(() => { 
    let isLoggedIn = localStorage.getItem("userId");
    if (isLoggedIn===null) {
      // Redirect to login page or show login modal
      navigate("/");
    }
    },[]);

    const handleSubmitFunc=async()=>{
      setLoading(true);
      await axios.post("http://localhost:4000/api/video",inputFields,{withCredentials:true}).then((res)=>{
        console.log(res);
        setLoading(false);
        navigate("/");
      }).catch((error)=>{
        console.error(error);
        setLoading(false);
      });
    }
    return (
      <div className="video_upload">
        <div className="uploadBox">
          {/* Upload box content goes here */}
          <div className="uploadVideoTitle">
            <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
            <span>Upload Video</span>
          </div>
          <div className="uploadForm">
            <input
              type="text "
              placeholder="Title of the video"
              value={inputFields.title}
              onChange={(e) => handleOnChangeInput(e, "title")}
              className="uploadFormnputs"
            />
            <input
              type="text "
              placeholder="Description"
              value={inputFields.description}
              onChange={(e) => handleOnChangeInput(e, "description")}
              className="uploadFormnputs"
            />
            <input
              type="text "
              placeholder="Category"
              value={inputFields.category}
              onChange={(e) => handleOnChangeInput(e, "category")}
              className="uploadFormnputs"
            />
            <div className="Thumbnail">
              Thumbnail{" "}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => uploadImage(e, "image")}
              />
            </div>
            <div className="Video">
              Video{" "}
              <input
                type="file"
                accept="video/mp4, video/webm, video/*"
                onChange={(e) => uploadImage(e, "video")}
              />
            </div>
            {loading && (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            )}
          </div>

          <div className="uploadBtns">
            <div className="uploadBtn-form" onClick={handleSubmitFunc}>Upload</div>
            <Link to="/" className="uploadBtn-form">
              Home
            </Link>
          </div>
        </div>
      </div>
    );
};

export default VideoUpload;