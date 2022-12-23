import React, { useState, useEffect } from "react";
import defaultProfileImg from "../img/default_profile_img.jpg";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Comment from "./Comment";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../api-util";

const Container = styled.div``;

const NewComment = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NoComment = styled.div`
  text-align: center;
  margin-top: 12px;
  font-weight: 500;
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

const Comments = ({ videoId, cookies }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (comment === "") return;
    if (currentUser) {
      try {
        const res = await axios.post(
          `${API_URL}comments/`,
          {
            videoId: videoId,
            desc: comment,
          },
          {
            headers: { access_token: cookies.access_token },
          }
        );
        setComments([...comments, res.data]);
        setComment("");
      } catch (err) {
        console.log(err.response.data);
      }
    } else {
      navigate("/signin");
    }
  };

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
      <NewComment onSubmit={handleAddComment}>
        <Avatar src={defaultProfileImg} />
        <Input
          type="text"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          placeholder="Add a comment"
        ></Input>
      </NewComment>
      {comments.length === 0 ? (
        <NoComment>
          No comments yet, be the first user to comment on this video!
        </NoComment>
      ) : (
        commentArr
      )}
    </Container>
  );
};

export default Comments;
