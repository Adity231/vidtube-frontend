import React, { useEffect,useState } from 'react';
import './profile.css';
import SideNavbar from '../../Components/SideNavbar/sideNavbar';
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link,useParams } from 'react-router-dom';
import axios from 'axios';

        const Profile = ({ sideNavbar }) => {

          const { id } = useParams();
          console.log(id);
          const [data, setData] = useState([]);
          const [user, setUser] = useState(null);
          const fetchProfileData = async () => {
            try {
              axios.get(`http://localhost:4000/api/${id}/channel`).then((response)=>{
                console.log(response.data);
                setData(response.data.videos);
                setUser(response.data.videos[0]?.user);
              });
            } catch (error) {
              console.error("Error fetching profile data:", error);
            }
          };
    useEffect(() => {
        fetchProfileData();
    }, []);

    return (
      <div className="profile">
        <SideNavbar sideNavbar={sideNavbar} />

        <div className={sideNavbar ? "profile_page" : "profile_page_inactive"}>
          <div className="profile_top_section">
            <div className="profile_top_section_profile">
              <img
                className="profile_top_section_image"
                src={user?.profilePic}
                alt="Profile"
              />
            </div>
            <div className="profile_top_section_about">
              <div className="profile_top_section_about_name">{user?.channelName}</div>
              <div className="profile_top_section_info">@{user?.username} .{data.length} videos </div>
              <div className="profile_top_section_info">
                {user?.about}
              </div>
            </div>
          </div>

          <div className="profile_videos">
            <div className="profile_videos_title">
              Videos &nbsp; <ArrowRightIcon />
            </div>
            <div className="profileVideos">
              {
                data?.map((item, key) => {
                  return (
                    <Link to={`/watch/${item?._id}`} className="profieVideo_block" key={key}>
                      <div className="profieVideo_block_thumbnail">
                        <img
                          src={item?.thumbnail}
                          alt=""
                          className="profileVideo_block_thumbnail_image"
                        />
                      </div>

                      <div className="profileVideo_block_detail">
                        <div className="profileVideo_block_name">
                          {item?.title}
                        </div>
                        <div className="profileVideo_block_about">
                          Uploaded on {item?.createdAt.slice(0, 10)}
                        </div>
                      </div>
                    </Link>
                  );
                })
              }
              {/* Video items would go here */}

            </div>
          </div>
        </div>
      </div>
    );
};

export default Profile;