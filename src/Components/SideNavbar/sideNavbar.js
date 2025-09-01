import react from "react";
import "./sideNavbar.css";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import VideocamIcon from "@mui/icons-material/Videocam";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import HistoryIcon from "@mui/icons-material/History";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DownloadIcon from "@mui/icons-material/Download";
const SideNavbar = ({sideNavbar}) => {
  return (
    <div className={sideNavbar?"home-SideNavbar":"home-SideNavbarHide"}>
      <div className="home-sideNavbarTop">
        <div className="side-NavbarTopOption">
          <HomeRoundedIcon />
          <div className="home-sideNavbarTopOptionTitle">Home</div>
        </div>
        <div className="side-NavbarTopOption">
          <VideocamIcon />
          <div className="home-sideNavbarTopOptionTitle">Shorts</div>
        </div>
        <div className="side-NavbarTopOption">
          <SubscriptionsIcon />
          <div className="home-sideNavbarTopOptionTitle">Subscriptions</div>
        </div>
      </div>
      <div className="home-sideNavbarMid">
        <div className="side-NavbarMidOption">
          <div className="home-sideNavbarMidOptionTitle">You</div>
          <ChevronRightIcon />
        </div>
        <div className="side-NavbarMidOption">
          <RecentActorsIcon />
          <div className="home-sideNavbarMidOptionTitle">Your Channel</div>
        </div>
        <div className="side-NavbarMidOption">
          <HistoryIcon />
          <div className="home-sideNavbarMidOptionTitle">History</div>
        </div>
        <div className="side-NavbarMidOption">
          <PlaylistPlayIcon />
          <div className="home-sideNavbarMidOptionTitle">Playlist</div>
        </div>
        <div className="side-NavbarMidOption">
          <SmartDisplayIcon />
          <div className="home-sideNavbarMidOptionTitle">Your Videos</div>
        </div>
        <div className="side-NavbarMidOption">
          <WatchLaterIcon />
          <div className="home-sideNavbarMidOptionTitle">Watch Later</div>
        </div>
        <div className="side-NavbarMidOption">
          <ThumbUpIcon />
          <div className="home-sideNavbarMidOptionTitle">Liked Videos</div>
        </div>
        <div className="side-NavbarMidOption">
          <DownloadIcon />
          <div className="home-sideNavbarMidOptionTitle">Downloads</div>
        </div>
      </div>
      <div className="home-sideNavbarMid">
        <div className="side-NavbarMidOption">
          <div className="home-sideNavbarBottomOptionTitleHeder">
            Subscriptions
          </div>
        </div>
        <div className="side-NavbarMidOption">
          <img
            className="sideNavbarLogo"
            src="https://tse1.mm.bing.net/th/id/OIP.9Z92B54tl1EyiJnT_EGX5QHaFS?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="Channel Thumbnail"
          />
          <div className="home-sideNavbarBottomOptionTitle">Aaj Tak</div>
        </div>
        <div className="side-NavbarMidOption">
          <img
            className="sideNavbarLogo"
            src="https://play-lh.googleusercontent.com/Vcd76CBOVKKf8AMluq7JvoTB8ImEmJJOC2hIfcjMuCgD0VPMcXulB7QDyPRHoZYRqBI"
            alt="Channel Thumbnail"
          />
          <div className="home-sideNavbarBottomOptionTitle">The LallanTop</div>
        </div>
        <div className="side-NavbarMidOption">
          <img
            className="sideNavbarLogo"
            src="https://i.pinimg.com/736x/94/7e/40/947e405ff7b832e61e4c1de5913f51a3.jpg"
            alt="Channel Thumbnail"
          />
          <div className="home-sideNavbarBottomOptionTitle">NDTV India</div>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
