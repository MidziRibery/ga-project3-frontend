import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import axios from "axios";
import { useSelector } from "react-redux";

const API_URL = "http://localhost:3001/api/";
// const API_URL = "https://odd-rose-lobster-hem.cyclic.app/api/";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid black;
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${API_URL}comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  const commentArr = comments.map((comment) => {
    return <Comment key={comment._id} comment={comment} />;
  });

  return (
    <Container>
      <NewComment>
        <Avatar
          src={
            currentUser
              ? currentUser.image
              : "https://www.hepper.com/wp-content/uploads/2018/03/howtokeepcatsfromscratchingfurniture_article_content3_031918-2.jpg"
          }
        />
        <Input placeholder="Add a comment"></Input>
      </NewComment>
      {commentArr}
    </Container>
  );
};

export default Comments;
