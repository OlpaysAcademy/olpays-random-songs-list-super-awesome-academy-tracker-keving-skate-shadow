import React, { Component } from 'react';
import './App.css';
import PlaylistContainer from './PlaylistContainer';

class App extends Component {
    render() {
        return (
            <div>
                <h2>Playlist tracker</h2>
                <PlaylistContainer />
            </div>
        );
    }
}

export default App;
