import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import classNames from 'classnames';

import Playlist from './Playlist';
import {
    createPlaylists,
    addPlaylist,
    shufflePlaylists,
    increaseTimesPlayed,
    toggleBlacklist,
    isPlaylistVisible,
    addSong
} from '../playlists';

import './Playlists.css';

class Playlists extends Component {
    constructor() {
        super();
        this.state = {
            playlists: createPlaylists(),
            timesPlayedMinimum: 0
        };
    }
    addPlaylist(title) {
        this.setState({
            playlists: addPlaylist(this.state.playlists, title)
        });
    }
    setMinimumTimesPlayed(timesPlayed) {
        this.setState({
            timesPlayedMinimum: timesPlayed
        });
    }
    chooseRandomPlaylist() {
        this.setState({
            playlists: shufflePlaylists(this.state.playlists)
        });
    }
    increaseTimesPlayed(id) {
        this.setState({
            playlists: increaseTimesPlayed(this.state.playlists, id)
        });
    }
    toggleBlacklist(id) {
        this.setState({
            playlists: toggleBlacklist(this.state.playlists, id)
        });
    }
    addSong(id, name) {
        this.setState({
            playlists: addSong(this.state.playlists, id, name)
        });
    }
    componentWillUpdate(nextProps, nextState) {
        if (nextState.playlists.length !== this.state.playlists.length) {
            this.props.onPlaylistsChanged(nextState.playlists.length);
        }
    }
    render() {
        const whitelistedPlaylists = this.state.playlists.filter(playlist => !playlist.isBlacklisted);
        const blacklistedPlaylists = this.state.playlists.filter(playlist => playlist.isBlacklisted);
        return (
            <div className="Playlists">
                <FlipMove enterAnimation="accordianVertical">
                    {
                        whitelistedPlaylists.length ? whitelistedPlaylists.map(renderPlaylist.bind(this)) : <div>No hay playlists</div>
                    }
                    <hr />
                    {
                        blacklistedPlaylists.length ? blacklistedPlaylists.map(renderPlaylist.bind(this)) : <div>No hay playlists blacklisteadas</div>
                    }
                </FlipMove>
            </div>
        );
    }
}

function renderPlaylist(playlist) {
    const className = classNames({
        'Playlists__playlist--hidden': !isPlaylistVisible(playlist, this.state.timesPlayedMinimum)
    });
    return (
        <Playlist
            className={className}
            playlist={playlist}
            onHear={() => this.increaseTimesPlayed(playlist.id) }
            onBlacklist={() => this.toggleBlacklist(playlist.id) }
            onAddSong={name => this.addSong(playlist.id, name) }
            key={playlist.id}
            />
    );
}

export default Playlists;