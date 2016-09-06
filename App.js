import React from 'react';
import NewPlaylist from './components/NewPlaylist';
import Playlist from './components/Playlist';
import Songs from './components/Songs';

const navigationLeft = {
    float: 'left',
    width: 250,
    height: '100%'
}

class App extends React.Component {
    constructor() {
        super();
        this.state = { songs: '', playlists: '', showSongs: false, playlistSongs: '', playlistId: '' };
        this.addPlaylistHandler = this.addPlaylistHandler.bind(this);
        this.addSongHandler = this.addSongHandler.bind(this);
        this.fetchPlaylistSongs = this.fetchPlaylistSongs.bind(this);
        this.showSongs = this.showSongs.bind(this);
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
            count: 0,
            songs: []
        }
        const allPlaylists = this.state.playlists.concat([newPlaylistObj]);
        this.setState({
            playlists: allPlaylists
        });
    }
    fetchPlaylistSongs(playlist) {
        const self = this;
        return playlist.songs.map(getSongs);
        function getSongs(songId) {
            return _.filter(self.state.songs, s => s.id === songId);
        }
    }
    addSongHandler(newSong) {
        const self = this;
        const newSongObj = {
            id: Date.now(),
            name: newSong.name,
            artist: newSong.artist
        }
        const allSongs = self.state.songs.concat([newSongObj]);
        self.setState({
            songs: allSongs
        });
        updatePlaylist();

        // Refactor because I already have the playlist id
        function updatePlaylist() {
            // const playlistToUpdate = _.find(self.state.playlists, p => p.id === newSong.playlistId);
            const updatedPlaylists = self.state.playlists.map(pushSong);
            self.setState({ playlists: updatedPlaylists });
            function fetchPlaylistSongs(songId) {
                return _.filter(allSongs, s => s.id === songId)[0];
            }
            const selPlaylist = _.find(updatedPlaylists, p => p.id === newSong.playlistId);
            self.setState({ playlistSongs: selPlaylist.songs.map(fetchPlaylistSongs) });
            function pushSong(playlist) {
                if (newSong.playlistId === playlist.id) {
                    playlist.songs.push(newSongObj.id);
                }
                return playlist;
            }
        }
    }
    showSongs(playlist) {
        const self = this;
        this.setState({ showSongs: true });
        this.setState({ selectedPlaylist: playlist });
        this.setState({ playlistSongs: playlist.songs.map(fetchPlaylistSongs) });
        function fetchPlaylistSongs(songId) {
            return _.filter(self.state.songs, s => s.id === songId)[0];
        }
    }
    render() {
        var createPlaylistItem = item => {
            return (
                <Playlist onShowSongs={this.showSongs} playlist={item}/>
            )
        }
        return (
            <div>
                <div style={navigationLeft}>
                    <h1>Playlist Crapper</h1>
                    <div>
                        { this.state.playlists
                        ? <ul>{this.state.playlists.map(createPlaylistItem)}</ul>
                        : '' }
                    </div>
                    <NewPlaylist onFormSubmit={this.addPlaylistHandler} />
                </div>
                <div>
                    <div>{ this.state.showSongs ? <Songs onSongSubmit={this.addSongHandler} playlist={this.state.selectedPlaylist} songs={this.state.playlistSongs}/> : ''}</div>
                </div>
            </div>
        )
    }
}

export default App
