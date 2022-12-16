import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { fetchSuccess, fetchStart } from "../redux/videoSlice";
import { updateUserPlaylist } from "../redux/userSlice";
import { current } from "@reduxjs/toolkit";
// import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
// import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
// import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
// import Card from "../components/Card";

// const API_URL = "https://odd-rose-lobster-hem.cyclic.app/api/";
const API_URL = "http://localhost:3001/api/";

const Container = styled.div`
  display: flex;
  width: 50%;
  margin-inline: auto;
  gap: 24px;
`;
const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
    margin: 15px 0px
    border: 0.5px solid black
`;

// const Recommendation = styled.div`
//   flex: 2;
// `;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

// const Image = styled.img`
//   height: 50px;
//   width: 50px;
//   border-radius: 50%;
// `;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

// const ChannelCounter = styled.span`
//   margin-top: 5px;
//   margin-bottom: 20px;
//   font-size: 12px;
// `;

const Description = styled.p`
  font-size: 14px;
`;

// const Subscribe = styled.button`
//   background-color: #cc1a00;
//   color: white;
//   font-weight: 500;
//   border: none;
//   border-radius: 3px;
//   height: max-content;
//   cursor: pointer;
//   padding: 10px 20px;
// `;

const Video = () => {
  const { currentVideo, loading } = useSelector((state) => state.video);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [videoSaved, setVideoSaved] = useState(false);

  const path = useLocation().pathname.split("/")[2];

  const saveVideo = async () => {
    try {
      const res = await axios.put(
        `${API_URL}users/playlist/add/${currentVideo._id}`,
        {},
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(updateUserPlaylist(res.data));
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchStart());
      try {
        const videoRes = await axios.get(
          `${API_URL}videos/${
            path === "random" ? `random/${currentVideo._id}` : `find/${path}`
          }`
        );
        console.log(videoRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {
        console.log(err.response);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const isSaved = currentUser.playlist.includes(currentVideo._id);
      setVideoSaved(isSaved);
    }
  }, [currentVideo, currentUser]);

  return (
    <Container>
      {!loading ? (
        <Content>
          <VideoWrapper>
            <iframe
              width="854"
              height="480"
              src={`https://www.youtube.com/embed/${currentVideo.youtubeId}`}
              title="YouTube Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </VideoWrapper>
          <Title>{currentVideo.title}</Title>
          <Details>
            <Buttons>
              {/* <Button>
              <ThumbUpOutlinedIcon />
              123
            </Button>
            <Button>
              <ThumbDownOffAltOutlinedIcon /> Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button> */}
              {currentUser ? (
                <Button
                  onClick={saveVideo}
                  style={
                    videoSaved ? { color: "green", pointerEvents: "none" } : {}
                  }
                >
                  <AddTaskOutlinedIcon />{" "}
                  {videoSaved ? "Video Saved" : "Save Video"}
                </Button>
              ) : (
                //   <Button style={{ color: "green", pointerEvents: "none" }}>
                //     <AddTaskOutlinedIcon /> Video Saved
                //   </Button>
                ""
              )}
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <Button>
                  <SkipNextIcon /> Next Video
                </Button>
              </Link>
            </Buttons>
          </Details>
          <Hr />
          <Channel>
            <ChannelInfo>
              {/* <Image src="https://www.hepper.com/wp-content/uploads/2018/03/howtokeepcatsfromscratchingfurniture_article_content3_031918-2.jpg" /> */}
              <ChannelDetail>
                <ChannelName>{currentVideo.creator}</ChannelName>
                {/* <ChannelCounter>300K subscribers</ChannelCounter> */}
                <Description>{currentVideo.description}</Description>
              </ChannelDetail>
            </ChannelInfo>
            {/* <Subscribe>SUBSCRIBE</Subscribe> */}
          </Channel>
          <Hr />
          <Comments></Comments>
        </Content>
      ) : (
        ""
      )}
      {/* <Recommendation>
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
      </Recommendation> */}
    </Container>
  );
};

export default Video;
