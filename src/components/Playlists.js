import React, { Component } from 'react';

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
    increaseTimesPlayed(id) {
        this.setState({
            playlists: increaseTimesPlayed(this.state.playlists, id)
        });
    }
    render() {
        return (
            <div className="Playlists">
                {
                    this.state.playlists.map(playlist =>
                        <Playlist playlist={playlist} onHear={() => this.increaseTimesPlayed(playlist.id) } key={playlist.id} />
                    )
                }
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
        timesPlayed: 0
    };
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