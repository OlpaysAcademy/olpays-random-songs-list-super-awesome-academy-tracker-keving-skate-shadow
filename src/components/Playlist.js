import React, { Component } from 'react';
import classNames from 'classnames';

import Button from './Button';
import Music from './Music';

import './Playlist.css';

class Playlist extends Component {
    render() {
        const { playlist, onHear, onBlacklist } = this.props;
        const className = classNames(this.props.className, 'Playlist', {
            'Playlist-blacklisted': playlist.isBlacklisted
        });
        const playlistButtonClassName = classNames({
            'Playlist-button': true,
            'Playlist-button-danger': true,
            'Playlist-button-blacklisted': playlist.isBlacklisted
        });
        return (
            <div className={className}>
                <span>{playlist.title}({playlist.timesPlayed}) </span>
                <div className="Playlist-actions">
                    <Button disabled={playlist.isBlacklisted} className="Playlist-button" onClick={() => onHear() }>
                        <Music className="Playlist-music" fill="#222" width="1em" height="1em" />
                        Escuchar
                    </Button>
                    <Button className={playlistButtonClassName} onClick={() => onBlacklist() }>
                        {playlist.isBlacklisted ? 'Whitelistear' : 'Blacklistear'}
                    </Button>
                </div>
            </div>
        );
    }
}

export default Playlist;