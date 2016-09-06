import _ from 'lodash';
import React from 'react';
import NewSong from './NewSong';

class Songs extends React.Component {
    constructor() {
        super();
        // this.state = { songs: [] };
        // this.addSong = this.addSong.bind(this);
    }
    // componentWillMount() {
    //     fetch('./../songs.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             this.setState({ songs: this.props.playlist.songs.map(fetchSong) });
    //             function fetchSong(songId) {
    //                 return _.filter(data, s => s.id === songId)[0];
    //             }
    //         });
    // }
    // addSong(newSong) {
    //     const newSongObj = {
    //         id: Date.now(),
    //         name: newSong.name,
    //         artist: newSong.artist
    //     }
    //     const allSongs = this.state.songs.concat([newSongObj]);
    //     this.setState({
    //         songs: allSongs
    //     });
    // }
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
