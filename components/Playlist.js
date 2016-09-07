import React from 'react';
import Songs from './Songs';

const playlistItem = {
    height: 40
};

const playlistName = {
    cursor: 'pointer',
    color: '#89949B'
};

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
                <div className="col-xs-12" style={playlistItem}>
                    <span className="col-xs-7 text-left">
                        <span className="glyphicon glyphicon-music iconItem"></span>
                        <a style={playlistName} onClick={this.showSongs}><strong>{this.props.playlist.name}</strong></a>
                    </span>
                    <span>{this.props.playlist.count}</span>
                    <button className='btn btn-primary btn-xs m-l-sm m-r-sm' onClick={this.incrementCounter}>+1</button>
                    <button className='btn btn-default btn-xs' onClick={this.blacklist}>{ this.props.playlist.blacklisted ? 'Unblacklist' : 'Blacklist' }</button>
                </div>
            </div>
        );
    }
}

export default Playlist;
