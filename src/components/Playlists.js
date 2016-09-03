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
            playlists: createPlaylists()
        };
    }
    addPlaylist(title) {
        this.setState({
            playlists: addPlaylist(this.state.playlists, title)
        });
    }
    setMinimumTimesPlayed(timesPlayed) {
        this.setState({
            playlists: showGreaterThanMinimumTimesPlayed(this.state.playlists, timesPlayed)
        });
    }
    chooseRandomPlaylist() {
        this.setState({
            playlists: shuffle(this.state.playlists)
        });
    }
    increaseTimesPlayed(id) {
        this.setState({
            playlists: increaseTimesPlayed(this.state.playlists, id)
        });
    }
    componentWillUpdate(nextProps, nextState) {
        if (nextState.playlists.length !== this.state.playlists.length) {
            this.props.onPlaylistsChanged(nextState.playlists.length);
        }
    }
    render() {
        return (
            <div className="Playlists">
                <FlipMove enterAnimation="accordianVertical">
                    {
                        this.state.playlists.map(playlist => {
                            const className = classNames({
                                'Playlists-playlist-hidden': !playlist.isVisible
                            });
                            return <Playlist className={className} playlist={playlist} onHear={() => this.increaseTimesPlayed(playlist.id) } key={playlist.id} />
                        })
                    }
                </FlipMove>
            </div>
        );
    }
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
        isVisible: true
    };
}

function showGreaterThanMinimumTimesPlayed(playlists, timesPlayed) {
    return playlists.map(playlist => {
        playlist.isVisible = playlist.timesPlayed >= timesPlayed;
        return playlist;
    });
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

function updatePlaylist(playlists, id, updater) {
    return playlists.map(playlist => playlist.id === id ? updater(playlist) : playlist);
}

export default Playlists;