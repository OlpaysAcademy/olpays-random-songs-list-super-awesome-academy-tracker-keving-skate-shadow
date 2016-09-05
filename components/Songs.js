import _ from 'lodash';
import React from 'react';
import NewSong from './NewSong';

class Songs extends React.Component {
    constructor() {
        super();
    }
    render(){
        const createPlaylistSongItem = item => <li key={item[0].id}>{item[0].name} - {item[0].artist}</li>;
        return (
            <div>
                <ul>{this.props.songs.map(createPlaylistSongItem)}</ul>
                <NewSong playlistId={this.props.playlist.id} onSongSubmit={this.props.onSongSubmit} />
            </div>
        )
    }
}

export default Songs;
