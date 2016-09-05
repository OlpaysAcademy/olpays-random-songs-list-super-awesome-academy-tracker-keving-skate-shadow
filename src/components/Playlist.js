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
            'Playlist--blacklisted': playlist.isBlacklisted
        });
        const blacklistButtonClassName = classNames({
            'Playlist__button': true,
            'Playlist__button--danger': true,
            'Playlist__button--blacklisted': playlist.isBlacklisted
        });
        const songsClassName = classNames({
            [`Playlist__Songs--visible-${this.state.areSongsVisible}`]: true
        });
        return (
            <div className='Playlist__container'>
                <div className={className}>
                    <span>{playlist.title}({playlist.timesPlayed}) </span>
                    <div className="Playlist__actions">
                        <Button disabled={playlist.isBlacklisted} className="Playlist__button" onClick={() => onHear() }>
                            <Music className="Playlist__music" fill="#222" width="1em" height="1em" />
                            Escuchar
                        </Button>
                        <Button className={blacklistButtonClassName} onClick={() => onBlacklist() }>
                            {playlist.isBlacklisted ? 'Whitelistear' : 'Blacklistear'}
                        </Button>
                        <Button className="Playlist__button" onClick={() => this.toggleSongInput() }>
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