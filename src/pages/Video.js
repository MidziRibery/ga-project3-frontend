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
import { API_URL } from "../api-util";

const Container = styled.div`
  display: flex;
  width: 50%;
  margin-inline: auto;
  gap: 24px;
  justify-content: center;
`;
const Content = styled.div``;

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

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Video = ({ cookies }) => {
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
        {
          headers: { access_token: cookies.access_token },
        }
      );
      dispatch(updateUserPlaylist(res.data));
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    // console.log(cookies);
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
              src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?&autoplay=1`}
              title="YouTube Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </VideoWrapper>
          <Title>{currentVideo.title}</Title>
          <Details>
            <Buttons>
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
              <ChannelDetail>
                <ChannelName>{currentVideo.creator}</ChannelName>
                <Description>{currentVideo.description}</Description>
              </ChannelDetail>
            </ChannelInfo>
          </Channel>
          <Hr />
          <Comments videoId={currentVideo._id} cookies={cookies} />
        </Content>
      ) : (
        ""
      )}
    </Container>
  );
};

export default Video;
