import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { format } from "timeago.js"; // make sure timeago.js is installed from package.json
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"; // icon for delete button
const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;
const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;
const Details = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;
const Button = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  align-self: start;
  &:hover {
    color: darkred;
  }
`;
const Texts = styled.div``;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
`;
const ChannelName = styled.h2`
  font-size: 14px;
  margin: 10px 0px;
`;
const Info = styled.div`
  font-size: 14px;
`;
function Card({ video, handleRemoveVideo }) {
  return (
    <Container>
      <Link
        to={`/video/${video._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Image src={video.thumbnail} />
      </Link>
      <Details>
        <Texts>
          <Link
            to={`/video/${video._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Title>{video.title}</Title>{" "}
          </Link>
          <ChannelName>{video.creator}</ChannelName>
          <Info>{format(video.updatedAt)}</Info>
        </Texts>
        {/* pass id of video to handleRemoveVideo function */}
        <Button
          onClick={() => {
            handleRemoveVideo(video._id);
          }}
        >
          <DeleteOutlineIcon />
        </Button>
      </Details>
    </Container> // layout of card has been altered
  );
}
export default Card;