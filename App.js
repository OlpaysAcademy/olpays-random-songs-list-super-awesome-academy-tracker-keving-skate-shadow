import React from 'react';
import NewPlaylist from './components/NewPlaylist';
import Playlist from './components/Playlist';
import Songs from './components/Songs';
import Random from './components/Random';
import Header from './components/Header';
import NoSongMsg from './components/NoSongMsg';
import { container, navigation, playlistWrapper, songInfo } from './appcss';

class App extends React.Component {
    constructor() {
        super();
        this.state = { songs: '', playlists: '', showSongs: false, playlistSongs: '', playlistId: '', randomPlaylist: '', counterFilter: '' };
        this.addPlaylistHandler = this.addPlaylistHandler.bind(this);
        this.addSongHandler = this.addSongHandler.bind(this);
        this.fetchPlaylistSongs = this.fetchPlaylistSongs.bind(this);
        this.showSongs = this.showSongs.bind(this);
        this.onIncrementCounter = this.onIncrementCounter.bind(this);
        this.onRandomClick = this.onRandomClick.bind(this);
        this.onBlacklistChange = this.onBlacklistChange.bind(this);
    }
    componentWillMount(){
        const fetchData = type => {
            fetch(`./${type}.json`)
                .then(res => res.json())
                .then(data => {
                    const change = {};
                    change[type] = data;
                    this.setState(change);
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
            songs: [],
            blacklisted: false
        }
        const allPlaylists = this.state.playlists.concat([newPlaylistObj]);
        this.setState({
            playlists: allPlaylists
        });
    }
    fetchPlaylistSongs(playlist) {
        const getSongs = songId => _.filter(this.state.songs, s => s.id === songId);
        return playlist.songs.map(getSongs);
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
    onIncrementCounter(playlistId) {
        const updatedPlaylists = this.state.playlists.map(incrementCounter);
        this.setState({ playlists: updatedPlaylists });
        function incrementCounter(playlist) {
            if (playlistId === playlist.id) {
                playlist.count = playlist.count + 1;
            }
            return playlist;
        }
    }
    onRandomClick(counterFilter) {
        const isAllBlacklisted = () => !_.find(this.state.playlists, p => p.blacklisted === false);
        if (isAllBlacklisted()) {
            this.setState({ randomPlaylist: 'All playlists are blacklisted!' });
            return;
        }
        const isValidPlaylist = selectedPlaylist => !selectedPlaylist.blacklisted && selectedPlaylist.count < counterFilter;
        const getRandomPlaylist = () => {
            const selectedOption = options[Math.floor(Math.random()*options.length)];
            const selectedPlaylist = _.find(this.state.playlists, p => p.id === selectedOption);
            return isValidPlaylist(selectedPlaylist) ? selectedPlaylist : getRandomPlaylist();
        }
        const options = this.state.playlists.map(p => p.id);
        const selectedPlaylist = getRandomPlaylist();
        this.setState({ randomPlaylist: selectedPlaylist.name });

    }
    onBlacklistChange(playlistId) {
        this.setState({ playlists: this.state.playlists.map(updatePlaylist)});
        function updatePlaylist(playlist) {
            if ( playlist.id === playlistId ) {
                playlist.blacklisted = !playlist.blacklisted;
            }
            return playlist;
        }
    }
    render() {
        var createPlaylistItem = item => {
            return (
                <Playlist
                    onShowSongs={this.showSongs}
                    playlist={item}
                    onIncrementCounter={this.onIncrementCounter}
                    onBlacklistChange={this.onBlacklistChange} 
                />
            )
        }
        return (
            <div>
                <Header />
                <div className="row">
                    <div className="col-xs-12" style={container}>
                        <div className="col-xs-3 text-left" style={navigation}>
                            <NewPlaylist onFormSubmit={this.addPlaylistHandler} />
                            <div>
                                { this.state.playlists
                                ? <div style={playlistWrapper}>{this.state.playlists.map(createPlaylistItem)}</div>
                                : '' }
                            </div>
                            <Random onRandomClick={this.onRandomClick} randomPlaylist={this.state.randomPlaylist} />
                        </div>
                        <div className="col-xs-9" style={songInfo}>
                            <div>{ this.state.showSongs ? <Songs onSongSubmit={this.addSongHandler} playlist={this.state.selectedPlaylist} songs={this.state.playlistSongs}/> : <NoSongMsg />}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App
