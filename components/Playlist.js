import React from 'react';
import Songs from './Songs';

class Playlist extends React.Component {
    constructor() {
        super();
        this.showSongs = this.showSongs.bind(this);
        this.incrementCounter = this.incrementCounter.bind(this);
        this.blacklist = this.blacklist.bind(this);
    }
    showSongs() {
        this.props.onShowSongs(this.props.playlist);
    }
    incrementCounter() {
        this.props.onIncrementCounter(this.props.playlist.id);
    }
    blacklist() {
        this.props.onBlacklistChange(this.props.playlist.id);
    }
    render() {
        return (
            <div>
                <li key={this.props.playlist.id}>
                    <a onClick={this.showSongs}>{this.props.playlist.name} - Listens: {this.props.playlist.count}</a>
                    <button onClick={this.incrementCounter}>+1</button>
                    <button onClick={this.blacklist}>{ this.props.playlist.blacklisted ? 'Unblacklist' : 'Blacklist' }</button>
                </li>
            </div>
        );
    }
}

export default Playlist;
