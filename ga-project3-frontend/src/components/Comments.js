import React from 'react'
import styled from 'styled-components'
import Comment from './Comment';

const Container = styled.div`

`;

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
    width: 100%
`;

const Comments = () => {
  return (
    <Container>
        <NewComment>
            <Avatar src='https://www.hepper.com/wp-content/uploads/2018/03/howtokeepcatsfromscratchingfurniture_article_content3_031918-2.jpg'/>
            <Input placeholder='Add a comment'></Input>
        </NewComment>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
    </Container>
  )
}

export default Comments