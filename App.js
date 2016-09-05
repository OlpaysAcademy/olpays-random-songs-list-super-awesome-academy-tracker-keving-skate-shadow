import React from 'react';
import NewPlaylist from './components/NewPlaylist';
import Playlist from './components/Playlist';

class App extends React.Component {
    constructor() {
        super();
        this.state = { playlists: '', songs: '' };
        this.addPlaylistHandler = this.addPlaylistHandler.bind(this);
        this.addSongHandler = this.addSongHandler.bind(this);
    }
    componentWillMount(){
        const self = this;
        function fetchData(type) {
            fetch(`./${type}.json`)
                .then(res => res.json())
                .then(data => {
                    const change = {};
                    change[type] = data;
                    self.setState(change);
                });
        }

        fetchData('songs');
        fetchData('playlists');
    }
    addPlaylistHandler(newPlaylist) {
        const newPlaylistObj = {
            id: Date.now(),
            name: newPlaylist,
            count: 0
        }
        const allPlaylists = this.state.playlists.concat([newPlaylistObj]);
        this.setState({
            playlists: allPlaylists
        });
    }
    addSongHandler(newSong) {
        const self = this;
        const newSongObj = {
            id: Date.now(),
            name: newSong.name,
            artist: newSong.artist
        }
        const allSongs = this.state.songs.concat([newSongObj]);
        this.setState({
            songs: allSongs
        });
        addSongToPlaylist();

        function addSongToPlaylist() {
            const updatedPlaylists = self.state.playlists.map(updatePlaylist);
            self.setState({ playlists: updatedPlaylists });
            function updatePlaylist(playlist) {
                if (newSong.playlistId === playlist.id) {
                    playlist.songs.push(newSongObj.id);
                }
                return playlist;
            }
        }
    }
    render() {
        var createPlaylistItem = item => {
            return (
                <Playlist onSongSubmit={this.addSongHandler} playlist={item} songs={this.state.songs}/>
            )
        }
        return (
            <div>
                <h1>Playlist Crapper</h1>
                <div> 
                    { this.state.playlists
                    ? <ul>{this.state.playlists.map(createPlaylistItem)}</ul>
                    : '' }
                </div>
                <NewPlaylist onFormSubmit={this.addPlaylistHandler} />
            </div>
        )
    }
}

export default App
