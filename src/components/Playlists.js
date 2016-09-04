import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import shuffle from 'lodash/shuffle';
import classNames from 'classnames';

import Playlist from './Playlist';

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

function shufflePlaylists(playlists) {
    const blacklisted = playlists.filter(playlist => playlist.isBlacklisted);
    const nonBlacklisted = playlists.filter(playlist => !playlist.isBlacklisted);
    return shuffle(nonBlacklisted).concat(blacklisted);
}

function renderPlaylist(playlist) {
    const className = classNames({
        'Playlists-playlist-hidden': !isPlaylistVisible(playlist, this.state.timesPlayedMinimum)
    });
    return (
        <Playlist
            className={className}
            playlist={playlist}
            onHear={() => this.increaseTimesPlayed(playlist.id) }
            onBlacklist={() => this.toggleBlacklist(playlist.id) }
            key={playlist.id}
            />
    );
}

function createPlaylists() {
    return [];
}

function addPlaylist(playlists, title) {
    return playlists.concat([createPlaylist(title)]);
}

function createPlaylist(title) {
    return {
        title,
        id: Math.random(),
        timesPlayed: 0,
        isVisible: true,
        isBlacklisted: false
    };
}

function isPlaylistVisible(playlist, timesPlayed) {
    return playlist.timesPlayed >= timesPlayed;
}

function increaseTimesPlayed(playlists, id) {
    return updatePlaylist(
        playlists,
        id,
        playlist => {
            playlist.timesPlayed += 1
            return playlist;
        }
    );
}

function toggleBlacklist(playlists, id) {
    return updatePlaylist(
        playlists,
        id,
        playlist => {
            playlist.isBlacklisted = !playlist.isBlacklisted;
            return playlist;
        }
    );
}

function updatePlaylist(playlists, id, updater) {
    return playlists.map(playlist => playlist.id === id ? updater(playlist) : playlist);
}

export default Playlists;