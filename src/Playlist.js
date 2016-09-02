import React from 'react';

import music from './images/music.svg';

import './Playlist.css';

const Playlist = ({ playlist }) =>
    <div className='Playlist'>
        <img src={music} className="Playlist-music" alt="logo" />
        {playlist.title}
    </div>

export default Playlist;