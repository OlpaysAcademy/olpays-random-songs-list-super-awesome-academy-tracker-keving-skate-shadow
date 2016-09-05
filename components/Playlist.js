import React from 'react';
import Songs from './Songs';

class Playlist extends React.Component {
    constructor() {
        super();
        this.state = { showSongs: false };
        this.showSongs = this.showSongs.bind(this);
    }
    showSongs() {
        const self = this;
        this.setState({
            showSongs: !this.state.showSongs
        });
    }
    render() {
        return (
            <div>
                <li key={this.props.playlist.id}>
                    {this.props.playlist.name} - Listens: {this.props.playlist.count}
                    <button onClick={this.showSongs}>Songs</button>
                </li>
                <div>{ this.state.showSongs ? <Songs onSongSubmit={this.props.onSongSubmit} playlist={this.props.playlist} songs={this.props.songs} /> : ''}</div>
            </div>
        );
    }
}

export default Playlist;
