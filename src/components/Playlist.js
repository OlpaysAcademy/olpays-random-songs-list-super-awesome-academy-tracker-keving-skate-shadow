import React, { Component } from 'react';

import Button from './Button';
import Music from './Music';

import './Playlist.css';

const Playlist = ({ playlist, onHear }) =>
    <div className='Playlist'>
        <span>{playlist.title}({playlist.timesPlayed})</span>
        <Button className="Playlist-button" onClick={() => onHear()}>
            <Music className="Playlist-music" fill="white" width="1em" height="1em" />
            Escuchar
        </Button>
    </div>;

export default Playlist;