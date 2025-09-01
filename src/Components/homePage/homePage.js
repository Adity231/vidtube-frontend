import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./homePage.css";
import axios from "axios";
import { set } from "mongoose";
const HomePage = ({ sideNavbar }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/allVideos")
      .then((res) => {
        console.log(res.data.videos);
        setData(res.data.videos);
      })
      .catch((err) => {
        console.log("Error fetching videos:", err);
      });
  }, []);
  const options = [
    "All",
    "Cricket",
    "Music",
    "Live",
    "Mixes",
    "Gaming",
    "Debates",
    "Coke Studio",
    "Democracy",
    "Pakistan",
    "Tarrif",
    "Thala",
    "IIT",
    "NIT",
    "Silchar",
    "Signals",
    "Tarrif",
    "Thala",
    "IIT",
    "NIT",
    "Silchar",
    "Signals",
  ];
  return (
    <div className={sideNavbar ? "home-page" : "home-page-collapsed"}>
      <div className="homePage_options">
        {options.map((option, index) => {
          return (
            <div className="homePage_option" key={index}>
              {option}
            </div>
          );
        })}
      </div>
      <div
        className={sideNavbar ? "home_MainPage" : "home_MainPage_wihoutlink"}
      >
        {data?.map((item, ind) => {
          return (
            <Link to={`/watch/${item._id}`} className="vidtube_video">
              <div className="vidtube_thumbnailBox">
                <img
                  src={item.thumbnail}
                  alt="Video Thumbnail"
                  className="vidtube_thumbnailPic"
                />
                <div className="vidtube_thumbnailTiming">28:04</div>
              </div>
              <div className="vidtube_titleBox">
                <div className="vidtube_titleBoxProfile">
                  <img
                    src={item?.user?.profilePic}
                    alt="Channel Logo"
                    className="vidtube_channelLogo"
                  />
                </div>
                <div className="vidtube_titleBoxInfo">
                  <div className="vidtube_titleBoxTitle">
                    {item?.title}
                  </div>
                  <div className="vidtube_channel">{item?.user?.channelName}</div>
                  <div className="vidtube_views">{item?.likes} likes</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
