import React from 'react';

import Playlist from './Playlist';

import './Playlists.css';

const Playlists = ({ playlists }) =>
    <div className="Playlists">
        { playlists.map(playlist => <Playlist key={ Math.random() } playlist={playlist} />) }
    </div>

export default Playlists;