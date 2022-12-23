import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "../api-util";
import { updateUserPlaylist } from "../redux/userSlice";
import axios from "axios";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  width: 80%;
  margin-inline: auto;
`;

// const Container = styled.div`
//   display: flex;
//   gap: 20px;
//   flex-wrap: wrap;
//   justify-content: center;
// `;

const Playlist = ({ cookies }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [videos, setVideos] = useState([]);

  const handleRemoveVideo = async (videoId) => {
    try {
      const res = await axios.put(
        `${API_URL}users/playlist/remove/${videoId}`,
        {},
        {
          headers: { access_token: cookies.access_token },
        }
      );
      if (res.data) {
        // console.log(res.data);
        const updatedVideoArr = videos.filter((video) => video._id !== videoId);
        setVideos(updatedVideoArr);
        dispatch(updateUserPlaylist(res.data));
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
  // console.log(currentUser._id);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoRes = await axios.get(`${API_URL}users/playlist/`, {
          headers: { access_token: cookies.access_token },
        });
        if (videoRes) {
          setVideos(videoRes.data);
        }
      } catch (err) {
        console.log(err.response.data);
      }
    };
    if (currentUser) {
      fetchVideoData();
    } else {
      navigate("/videos/all");
    }
  }, []);

  const videoArr = videos.map((video) => {
    return (
      <Card
        key={video._id}
        video={video}
        handleRemoveVideo={handleRemoveVideo}
      /> // handleRemoveVideo function passed to child component to be used
    );
  });

  return <Container>{videoArr}</Container>;
};

export default Playlist;
