import React from 'react'
import styled from 'styled-components'
import Card from '../components/Card'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const Home = () => {
  return (
    <div>
      <h1>Playlist</h1>
    <Container>
      {/* Think how to add a video everytime someone save a vid */}
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>


    </Container>
    </div>
  )
}

export default Home