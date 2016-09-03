import React, { Component } from 'react';

import Playlists from './Playlists';
import PlaylistForm from './PlaylistForm';
import logo from '../images/logo.svg';

import './App.css';

class App extends Component {
    addPlaylist(title) {
        // Refactor: Make Playlists component responsible of playlists array and communicate with it using refs
        // Parent to child communication
        // More info: http://andrewhfarmer.com/component-communication/#2-ref-functions
        // this.setState({
        //     playlists: this.state.playlists.concat([playlist])
        // });
        this.refs.Playlists.addPlaylist(title);
    }
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2 className="App-title">Playlists</h2>
                </div>
                <div className="App-body">
                    <PlaylistForm onSubmit={title => this.addPlaylist(title) } />
                    <Playlists ref="Playlists" />
                </div>
            </div>
        );
    }
};

export default App;
