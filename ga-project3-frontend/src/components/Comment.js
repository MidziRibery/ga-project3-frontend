import React from 'react'
import styled from 'styled-components'

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
`
const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: gray;
  margin-left: 5px;
`
const Text = styled.span`
  font-size:14px;
`

const Comment = () => {
  return (
    <Container>
      <Avatar src='https://www.hepper.com/wp-content/uploads/2018/03/howtokeepcatsfromscratchingfurniture_article_content3_031918-2.jpg'/>
      <Details>
        <Name>Charmaine</Name>
        <Date>1 day ago</Date>
        <Text>Lorem ipsum dolor</Text>
      </Details>
    </Container>
  )
}

export default Comment