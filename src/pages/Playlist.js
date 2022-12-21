import React from 'react'
import styled from 'styled-components'
import Card from '../components/Card'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const Playlist = () => {
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

export default Playlist

// const videoRes = await axios.get(`${API_URL}videos/all/`, {
//   headers: { access_token: cookies.access_token },
// });
// Must use useEffect 
// this park here first,

//axios.delete here too.
//delete button handleDeleteVideo needs to be inside the card.
// function is at home and pass it down. useState?