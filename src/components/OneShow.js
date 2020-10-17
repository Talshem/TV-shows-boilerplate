import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './OneShow.css';
import likedImg from "../media/liked.png"
import notLikedImg from "../media/notLiked.png"
import axios from 'axios'

function OneShow() {
const { id } = useParams(); //this is the selected show id
const [show, setShow] = useState(null)
const [liked, setLiked] = useState(null)


useEffect(() => {
const fetchData = async () => {
await axios.get(`https://www.episodate.com/api/show-details?q=${id}`)
.then((res) => {
setShow(res.data.tvShow)
if (localStorage.getItem(res.data.tvShow.id)) {
setLiked(localStorage.getItem(res.data.tvShow.id))
}
})
}; fetchData()
}, [])

const handleLike = () => {
if (localStorage.getItem(show.id)) {
localStorage.removeItem(show.id)
setLiked(null)
return
}
localStorage.setItem(show.id, likedImg)
setLiked(localStorage.getItem(show.id))
}

const ratingColor = (e) => {
if(e >= 8){
return 'green'
} else if (e >= 6){
return 'yellow'
}
return 'red'
}


  return (
    <div className='one-show-container'>
      <Link className='go-back-link' to='/'>
        <img
          className='go-back-img'
          alt='Go back'
          src='https://img.icons8.com/metro/52/000000/circled-left-2.png'
        />
    </Link>

{show && <>
<div className="like-div" onClick={handleLike}>
<img className="interaction-img" alt={liked ? 'liked' : 'not liked'} src={liked ? liked : notLikedImg}/>
</div>

<div className='one-show-img-and-title'>
<h2>{show.name}</h2>
<img className="one-show-img" src={show.image_path}/>
<div className='one-show-footer'>
<div className="seasons">{show.episodes[show.episodes.length-1].season} seasons</div>
<div className="genres">{show.genres.map(e => <span key={e} className="genre">{e}</span>)}</div>
<div className="rating">
<span className={ratingColor(Number(show.rating))}>{show.rating.length > 3 ? show.rating.substr(0,3): show.rating}</span>
</div>
<div className="status">{show.status}</div>
</div>
</div>

<div className='one-show-description'>
<h2>description:</h2>
{show.description}
</div>
</>}
    </div>
  );
}

export default OneShow;
