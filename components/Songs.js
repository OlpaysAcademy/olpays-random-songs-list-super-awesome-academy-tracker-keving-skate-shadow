import _ from 'lodash';
import React from 'react';
import NewSong from './NewSong';

const mainContent = {
    'margin-top': 100
};

class Songs extends React.Component {
    constructor() {
        super();
    }
    render(){
        const createPlaylistSongItem = item => <li key={item.id}>{item.name} - {item.artist}</li>;
        return (
            <div>
                { this.props.songs ? <ul>{this.props.songs.map(createPlaylistSongItem)}</ul> : '' }
                <NewSong playlist={this.props.playlist} onSongSubmit={this.props.onSongSubmit} />
            </div>
        )
    }
}

export default Songs;
