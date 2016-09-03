import React, { Component } from 'react';
import classNames from 'classnames';

import Button from './Button';
import Music from './Music';

import './Playlist.css';

class Playlist extends Component {
    render() {
        const { playlist, onHear } = this.props;
        const className = classNames(this.props.className, 'Playlist');
        return (
            <div className={className}>
                <span>{playlist.title}({playlist.timesPlayed}) </span>
                <Button className="Playlist-button" onClick={() => onHear() }>
                    <Music className="Playlist-music" fill="#222" width="1em" height="1em" />
                    Escuchar
                </Button>
            </div>
        );
    }
}

export default Playlist;