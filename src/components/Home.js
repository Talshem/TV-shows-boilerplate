import React, { useState, useEffect } from 'react';
import Show from './Show';
import './Home.css';
import bg from '../video/popcorn.mp4';
import axios from 'axios'

function Home() {
const [shows, setShows] = useState([]);
const [search, setSearch] = useState('')

useEffect(() => {
const fetchData = async () => {
await axios.get('https://www.episodate.com/api/most-popular')
.then((res) => {
setShows(res.data.tv_shows)
})
}; fetchData()
}, [])

const handleSearch = async (e) => {
e.preventDefault()
await axios.get(
search === '' ? 
'https://www.episodate.com/api/most-popular'
:
`https://www.episodate.com/api/search?q=${search}`
)
.then((res) => {
setShows(res.data.tv_shows)
})
}

  return (
    <div className='app'>
<form onSubmit={handleSearch}>
<input onChange={(e) => setSearch(e.target.value)} id="search-bar"/>
<button id="submit-btn">Search</button>
</form>



      <video src={bg} playsInline autoPlay muted loop id='bgvid' />
      {/* If you want to know how to implement video as your background 
      you can take a look here: https://www.w3schools.com/howto/howto_css_fullscreen_video.asp */}
      <h1>The Best T.V Shows</h1>
      {/*
      
        Insert your code here 
      
      
      */}
      <div className="top-shows">
      {shows.map((show) => (
        <Show show={show} key={show.id} />
      ))}
      </div>
    </div>
  );
}

export default Home;
