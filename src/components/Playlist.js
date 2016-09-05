import React, { Component } from 'react';
import classNames from 'classnames';

import Button from './Button';
import Music from './Music';
import Songs from './Songs';

import './Playlist.css';

class Playlist extends Component {
    constructor() {
        super();
        this.state = {
            areSongsVisible: false
        };
    }
    toggleSongInput() {
        this.setState({
            areSongsVisible: !this.state.areSongsVisible
        });
    }
    render() {
        const { playlist, onHear, onBlacklist } = this.props;
        const className = classNames(this.props.className, 'Playlist', {
            'Playlist-blacklisted': playlist.isBlacklisted
        });
        const blacklistButtonClassName = classNames({
            'Playlist-button': true,
            'Playlist-button-danger': true,
            'Playlist-button-blacklisted': playlist.isBlacklisted
        });
        const songsClassName = classNames({
            [`Playlist-Songs-areVisible-${this.state.areSongsVisible}`]: true
        });
        return (
            <div className='Playlist-container'>
                <div className={className}>
                    <span>{playlist.title}({playlist.timesPlayed}) </span>
                    <div className="Playlist-actions">
                        <Button disabled={playlist.isBlacklisted} className="Playlist-button" onClick={() => onHear() }>
                            <Music className="Playlist-music" fill="#222" width="1em" height="1em" />
                            Escuchar
                        </Button>
                        <Button className={blacklistButtonClassName} onClick={() => onBlacklist() }>
                            {playlist.isBlacklisted ? 'Whitelistear' : 'Blacklistear'}
                        </Button>
                        <Button className="Playlist-button" onClick={() => this.toggleSongInput() }>
                            {this.state.areSongsVisible ? '-' : '+'}
                        </Button>
                    </div>
                </div>
                <Songs className={songsClassName} songs={playlist.songs} onAddSong={name => this.props.onAddSong(name)} />
            </div>
        );
    }
}

export default Playlist;