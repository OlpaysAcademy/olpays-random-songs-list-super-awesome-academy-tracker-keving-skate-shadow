import _ from 'lodash';
import React from 'react';
import NewSong from './NewSong';

const mainContent = {
    'margin-top': 100
};

const songItem = {
    height: 50,
    borderBottom: '1px solid black',
    display: 'flexbox',
    alignItems: 'center',
    justifyContent: 'center'
}

const songsHeader = {
    height: 50,
    borderBottom: '2px solid black'
}

class Songs extends React.Component {
    constructor() {
        super();
    }
    render(){
        const createPlaylistSongItem = item => {
            return (
                <div style={songItem}>
                    <span className="row">
                        <span className="col-xs-6 text-center">{item.name}</span>
                        <span className="col-xs-6 text-center">{item.artist}</span>
                    </span>
                </div>
            )
        };
        return (
            <div>
                <div style={songsHeader}>
                    <span className="row">
                        <span className="col-xs-6 text-center"><strong>Song</strong></span>
                        <span className="col-xs-6 text-center"><strong>Artist</strong></span>
                    </span>
                </div>
                <div>{this.props.songs.map(createPlaylistSongItem)}</div>
                <NewSong playlist={this.props.playlist} onSongSubmit={this.props.onSongSubmit} />
            </div>
        )
    }
}

export default Songs;
