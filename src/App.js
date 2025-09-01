import logo from './logo.svg';
import './App.css';
import Navbar from './Components/navbar/navbar';
import Home from './pages/home/home';
import {useState,useEffect} from 'react';
import {Route,Routes} from 'react-router-dom';
import Video from './pages/Video/video';
import Profile from './pages/profile/profile';
import VideoUpload from './pages/videoUpload/videoUpload';
import SignUp from './pages/Signup/signup';
import axios from 'axios';
import { use } from 'react';
function App() {
  const [sideNavbar, setSideNavbar] = useState(true);
  // useEffect(() => {
  //   axios.get('http://localhost:4000/api/allVideos').then(res => {
  //     console.log(res);
  //   }).catch(err => {
  //     console.log('Error fetching videos:', err);
  //   });
  // }, []);
  const setSideNavbarFunc = (value) => {
    setSideNavbar(value);
  };
  return (
    <div className="App">
      <Navbar setSideNavbarFunc={setSideNavbarFunc} sideNavbar={sideNavbar} />
      <Routes>
        <Route path="/" element={<Home sideNavbar={sideNavbar} />} />
        <Route path="/watch/:id" element={<Video />} />
        <Route path="/user/:id" element={<Profile sideNavbar={sideNavbar} />} />
        <Route path="/:id/upload" element={<VideoUpload />} />
        <Route path='signup' element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
