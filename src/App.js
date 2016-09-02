import React, { Component } from 'react';

import Playlists from './Playlists';
import PlaylistForm from './PlaylistForm';
import logo from './images/logo.svg';

import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            playlists: []
        };
    }
    addPlaylist(playlist) {
        this.setState({
            playlists: this.state.playlists.concat([playlist])
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
                    <PlaylistForm onSubmit={playlist => this.addPlaylist(playlist) } />
                    <Playlists playlists={this.state.playlists} />
                </div>
            </div>
        );
    }
};

export default App;
