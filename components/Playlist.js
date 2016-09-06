import React from 'react';
import Songs from './Songs';

class Playlist extends React.Component {
    constructor() {
        super();
        this.state = { songs: '' };
        this.showSongs = this.showSongs.bind(this);
    }
    showSongs() {
        this.props.onShowSongs(this.props.playlist);
    }
    render() {
        return (
            <div>
                <li key={this.props.playlist.id}>
                    {this.props.playlist.name} - Listens: {this.props.playlist.count}
                    <button onClick={this.showSongs}>Songs</button>
                </li>
            </div>
        );
    }
}

export default Playlist;
