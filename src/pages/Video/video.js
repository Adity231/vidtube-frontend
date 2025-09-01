import React from 'react';
import './video.css';
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {toast,Toaster} from 'react-hot-toast';

const Video = () => {
  const [message,setMessage]=useState("");
  const [data,setData]=useState(null);
  const [videoUrl,setVideoUrl]=useState("");
  const [comments,setComments]=useState([]);
  const fetchVideoById=async()=>{
    try {
      await axios
        .get(`http://localhost:4000/api/getVideoById/${id}`)
        .then((response) => {
          console.log(response.data.video);
          setData(response.data.video);
          setVideoUrl(response.data?.video?.url);
        });
    } catch (error) {
      console.error("Error fetching video:", error);
    }               
  }

  const getCommentByVideoId=async()=>{
    try {
      await axios
        .get(`http://localhost:4000/commentApi/comment/${id}`)
        .then((response) => {
          console.log(response);
          setComments(response.data.comments);
        });
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  useEffect(()=> {
    fetchVideoById();
    getCommentByVideoId();
  },[])
  const {id}=useParams();
  console.log(id);
  // console.log(message);

  const handleCommentSubmit = async () => {
      try {
        const body = {
          "message": message,
          "video": id
        };
        await axios.post(`http://localhost:4000/commentApi/comment`, body, { withCredentials: true }).then((response) => {
          console.log(response.data);
          const newComment = response.data.comment;
          setComments([newComment,...comments]);
          setMessage("");
        });
      } catch (error) {
        console.error("Error submitting comment:", error);
        toast.error("Please Login first");
      }
    };

    return (
      <div className="video">
        <div className="videoPostSectiion">
          <div className="video_vidtube">
            {data && (
              <video
                width="400"
                controls
                autoPlay
                className="video_vidtube_video"
              >
                <source src={videoUrl} type="video/mp4" />
                <source src={videoUrl} type="video/webm" />
              </video>
            )}
          </div>
          <div className="video_vidtubeAbout">
            <div className="video_vidtubeTitles">{data?.title}</div>
            <div className="vidtube_video_profileBlock">
              <div className="vidtube_video_profileBlock_left">
                <Link
                  to={`/user/${data?.user?._id}`}
                  className="vidtube_video_profileBlock_left_img"
                >
                  <img
                    src={data?.user?.profilePic}
                    alt=""
                    className="vidtube_video_profileBlock_left_image"
                  />
                </Link>
                <div className="vidtubeVideo_subsView">
                  <div className="vidtubePostProfileName">
                    {data?.user?.channelName}
                  </div>
                  <div className="vidtubePostDate">
                    {data?.user?.createdAt.slice(0, 10)}
                  </div>
                </div>
                <div className="subscribeButton_vidtube">Subscribe</div>
              </div>
              <div className="vidtube_video_profileBlock_right">
                <div className="vidtube_video_likeBlock">
                  <ThumbUpOffAltIcon />
                  <div className="vidtube_video_likeCount">{data?.likes}</div>
                </div>
                <div className="vidtube_videoDivider"></div>
                <div className="vidtube_video_dislikeBlock">
                  <ThumbDownOffAltIcon />
                </div>
              </div>
            </div>
            <div className="video_vidtubeDescription">
              <div className="video_postingDate">
                {data?.createdAt.slice(0, 10)}
              </div>
              <div className="video_postingDate">{data?.description}</div>
            </div>
            <div className="vidtube_videoCommentSection">
              <div className="vidtube_videoCommentCount">{comments.length} Comments</div>
              <div className="video_vidtubeselfComment">
                <img
                  className="vidTube_selfCommentProfile"
                  src="https://img6.arthub.ai/64c007f4-aa90.webp"
                  alt="ProfilePic"
                />
                <div className="addAComment">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="addACommentInput"
                  />
                  <div className="cancelSubmitComment">
                    <div className="cancelComment">Cancel</div>
                    <div className="cancelComment" onClick={handleCommentSubmit}>Comment</div>
                  </div>
                </div>
              </div>
              <div className="vidtubeOthersComments">
                {comments.map((item, index) => (
                  <div className="video_vidtubeselfComment">
                    <img
                      className="vidTube_selfCommentProfile"
                      src={item?.user?.profilePic}
                      alt="ProfilePic"
                    />
                    <div className="othersCommentSection">
                      <div className="othersCommentHeaders">
                        <div className="othersCommentName">{item?.user?.channelName}</div>
                        <div className="othersCommentDate">{item?.createdAt?.slice(0, 10)}</div>
                      </div>
                      <div className="otherCommentsectionComment">
                        {item.message}
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>
        <div className="videoSuggestions">
          <div className="videoSuggestionBlock">
            <div className="videoSuggesstionThumbnail">
              <img
                src="https://1.bp.blogspot.com/-aLbT5rdO2rU/Xr7hLoklUgI/AAAAAAAADa0/jDdbvtWju40BqAd2qwF6vJ4Tp9NmyG2tQCLcBGAsYHQ/s1600/01.jpg"
                alt="Video Thumbnail"
                className="videoSuggestionThumbnailImage"
              />
            </div>
            <div className="videoSuggestionAbout">
              <div className="videoSuggestionTitle">
                {"How to grow on vidtube in 1 day"}
              </div>
              <div className="videoSuggestionChannel">{"Cricket World"}</div>
              <div className="videoSuggestionChannel">
                {"1M views . 2 days ago"}
              </div>
            </div>
          </div>
          <div className="videoSuggestionBlock">
            <div className="videoSuggesstionThumbnail">
              <img
                src="https://1.bp.blogspot.com/-aLbT5rdO2rU/Xr7hLoklUgI/AAAAAAAADa0/jDdbvtWju40BqAd2qwF6vJ4Tp9NmyG2tQCLcBGAsYHQ/s1600/01.jpg"
                alt="Video Thumbnail"
                className="videoSuggestionThumbnailImage"
              />
            </div>
            <div className="videoSuggestionAbout">
              <div className="videoSuggestionTitle">
                {"How to grow on vidtube in 1 day"}
              </div>
              <div className="videoSuggestionChannel">{"Cricket World"}</div>
              <div className="videoSuggestionChannel">
                {"1M views . 2 days ago"}
              </div>
            </div>
          </div>{" "}
          <div className="videoSuggestionBlock">
            <div className="videoSuggesstionThumbnail">
              <img
                src="https://1.bp.blogspot.com/-aLbT5rdO2rU/Xr7hLoklUgI/AAAAAAAADa0/jDdbvtWju40BqAd2qwF6vJ4Tp9NmyG2tQCLcBGAsYHQ/s1600/01.jpg"
                alt="Video Thumbnail"
                className="videoSuggestionThumbnailImage"
              />
            </div>
            <div className="videoSuggestionAbout">
              <div className="videoSuggestionTitle">
                {"How to grow on vidtube in 1 day"}
              </div>
              <div className="videoSuggestionChannel">{"Cricket World"}</div>
              <div className="videoSuggestionChannel">
                {"1M views . 2 days ago"}
              </div>
            </div>
          </div>{" "}
          <div className="videoSuggestionBlock">
            <div className="videoSuggesstionThumbnail">
              <img
                src="https://1.bp.blogspot.com/-aLbT5rdO2rU/Xr7hLoklUgI/AAAAAAAADa0/jDdbvtWju40BqAd2qwF6vJ4Tp9NmyG2tQCLcBGAsYHQ/s1600/01.jpg"
                alt="Video Thumbnail"
                className="videoSuggestionThumbnailImage"
              />
            </div>
            <div className="videoSuggestionAbout">
              <div className="videoSuggestionTitle">
                {"How to grow on vidtube in 1 day"}
              </div>
              <div className="videoSuggestionChannel">{"Cricket World"}</div>
              <div className="videoSuggestionChannel">
                {"1M views . 2 days ago"}
              </div>
            </div>
          </div>{" "}
          <div className="videoSuggestionBlock">
            <div className="videoSuggesstionThumbnail">
              <img
                src="https://1.bp.blogspot.com/-aLbT5rdO2rU/Xr7hLoklUgI/AAAAAAAADa0/jDdbvtWju40BqAd2qwF6vJ4Tp9NmyG2tQCLcBGAsYHQ/s1600/01.jpg"
                alt="Video Thumbnail"
                className="videoSuggestionThumbnailImage"
              />
            </div>
            <div className="videoSuggestionAbout">
              <div className="videoSuggestionTitle">
                {"How to grow on vidtube in 1 day"}
              </div>
              <div className="videoSuggestionChannel">{"Cricket World"}</div>
              <div className="videoSuggestionChannel">
                {"1M views . 2 days ago"}
              </div>
            </div>
          </div>{" "}
          <div className="videoSuggestionBlock">
            <div className="videoSuggesstionThumbnail">
              <img
                src="https://1.bp.blogspot.com/-aLbT5rdO2rU/Xr7hLoklUgI/AAAAAAAADa0/jDdbvtWju40BqAd2qwF6vJ4Tp9NmyG2tQCLcBGAsYHQ/s1600/01.jpg"
                alt="Video Thumbnail"
                className="videoSuggestionThumbnailImage"
              />
            </div>
            <div className="videoSuggestionAbout">
              <div className="videoSuggestionTitle">
                {"How to grow on vidtube in 1 day"}
              </div>
              <div className="videoSuggestionChannel">{"Cricket World"}</div>
              <div className="videoSuggestionChannel">
                {"1M views . 2 days ago"}
              </div>
            </div>
          </div>{" "}
          <div className="videoSuggestionBlock">
            <div className="videoSuggesstionThumbnail">
              <img
                src="https://1.bp.blogspot.com/-aLbT5rdO2rU/Xr7hLoklUgI/AAAAAAAADa0/jDdbvtWju40BqAd2qwF6vJ4Tp9NmyG2tQCLcBGAsYHQ/s1600/01.jpg"
                alt="Video Thumbnail"
                className="videoSuggestionThumbnailImage"
              />
            </div>
            <div className="videoSuggestionAbout">
              <div className="videoSuggestionTitle">
                {"How to grow on vidtube in 1 day"}
              </div>
              <div className="videoSuggestionChannel">{"Cricket World"}</div>
              <div className="videoSuggestionChannel">
                {"1M views . 2 days ago"}
              </div>
            </div>
          </div>
        </div>
        <Toaster/>
      </div>
    );
};

export default Video;