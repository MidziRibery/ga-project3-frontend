import React, { useEffect, useState } from "react";
import defaultProfileImg from "../img/default_profile_img.jpg";
import styled from "styled-components";
import axios from "axios";
import { format } from "timeago.js";
import { API_URL } from "../api-util";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;
const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: gray;
  margin-left: 5px;
`;
const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({ comment }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`${API_URL}users/find/${comment.userId}`);
      setUser(res.data);
    };
    fetchComment();
  }, []);
  return (
    <Container>
      <Avatar src={user.image ? user.image : defaultProfileImg} />
      <Details>
        <Name>{user.name}</Name>
        <Date>{format(comment.createdAt)}</Date>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  );
};

export default Comment;
