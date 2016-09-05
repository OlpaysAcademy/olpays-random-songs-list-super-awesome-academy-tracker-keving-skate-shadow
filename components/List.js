import React from 'react';
import Songs from './Songs';
import Playlist from './Playlist';

class List extends React.Component {
    constructor() {
        super();
    }
    render() {
        var createPlaylistItem = item => {
            return (
                <Playlist onSongSubmit={this.props.onSongSubmit} playlist={item} songs={this.props.songs}/>
            )
        }
        return <ul>{this.props.playlists.map(createPlaylistItem)}</ul>;
    }
}

export default List;
