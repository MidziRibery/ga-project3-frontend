import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_URL } from "../api-util";
import axios from "axios";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const Playlist = ({ cookies }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoRes = await axios.get(`${API_URL}videos/all/`, {
          headers: { access_token: cookies.access_token },
        });
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
    return <Card key={video._id} video={video} />;
  });

  return <Container>{videoArr}</Container>;
};

export default Playlist;

// const videoRes = await axios.get(`${API_URL}videos/all/`, {
//   headers: { access_token: cookies.access_token },
// });
// Must use useEffect 
// this park here first,

//axios.delete here too.
//delete button handleDeleteVideo needs to be inside the card.
// function is at home and pass it down. useState?