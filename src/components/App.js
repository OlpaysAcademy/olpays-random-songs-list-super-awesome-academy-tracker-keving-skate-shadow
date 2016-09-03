import React, { Component } from 'react';

import Playlists from './Playlists';
import PlaylistForm from './PlaylistForm';
import RandomChooser from './RandomChooser';
import logo from '../images/logo.svg';

import './App.css';

// Playlists component is responsible of playlists array and App component communicate with it using refs
// Parent to child communication
// More info: http://andrewhfarmer.com/component-communication/#2-ref-functions
class App extends Component {
    constructor() {
        super();
        this.state = {
            arePlaylistsEmpty: true
        };
    }
    updatePlaylistEmptiness(playlistsLength) {
        this.setState({
            arePlaylistsEmpty: playlistsLength <= 1 ? true : false
        });
    }
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2 className="App-title">Playlists</h2>
                </div>
                <div className="App-body">
                    <PlaylistForm onSubmit={title => this.refs.Playlists.addPlaylist(title) } />
                    <RandomChooser isDisabled={this.state.arePlaylistsEmpty} onSubmit={() => this.refs.Playlists.chooseRandomPlaylist() } />
                    <Playlists ref="Playlists" onPlaylistsChanged={playlistsLength => this.updatePlaylistEmptiness(playlistsLength)} />
                </div>
            </div>
        );
    }
};

export default App;
