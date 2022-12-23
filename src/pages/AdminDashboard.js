import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_URL } from "../api-util";
import axios from "axios";

const Container = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const AdminDashboard = ({ cookies }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [videos, setVideos] = useState([]);

  // function passed to card component in order to remove video
  const handleRemoveVideo = async (videoId) => {
    try {
      const res = await axios.delete(`${API_URL}videos/${videoId}`, {
        headers: { access_token: cookies.access_token },
      });
      if (res.data) {
        console.log(res.data);
        // removes deleted video from "videos" array - updates component to remove delete video from page
        const updatedVideoArr = videos.filter((video) => video._id !== videoId);
        setVideos(updatedVideoArr);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoRes = await axios.get(
          `${API_URL}videos/all/`,

          {
            headers: { access_token: cookies.access_token },
          }
        );
        if (videoRes) {
          setVideos(videoRes.data);
        }
      } catch (err) {
        console.log(err.response.data);
      }
    };
    if (currentUser && currentUser.isAdmin) {
      fetchVideoData();
    } else {
      navigate("/video/random");
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

export default AdminDashboard;
