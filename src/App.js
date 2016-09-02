import React, { Component } from 'react';
import './App.css';
import Songslist from './Songslist';
import Playlist from './Playlist';

const SONGS = 
      [
        { trackNumber: 1, artist: 'Coti', title: 'Días' },
        { trackNumber: 2, artist: 'Coti', title: 'Pequeña lucha' },
        { trackNumber: 3, artist: 'Coti', title: '50 horas' },
        { trackNumber: 4, artist: 'Coti', title: 'Olvidarte' },
        { trackNumber: 5, artist: 'Coti', title: 'Que esperas' },
        { trackNumber: 6, artist: 'Coti', title: 'Paris de tu mano' },
        { trackNumber: 7, artist: 'Coti', title: 'Tu gloria' },
        { trackNumber: 8, artist: 'Coti', title: 'No quise ver' },
        { trackNumber: 9, artist: 'Coti', title: 'LQS' },
        { trackNumber: 10, artist: 'Coti', title: 'Profundidad' },
        { trackNumber: 11, artist: 'Coti', title: 'El privilegio de los corazones rotos' },
        { trackNumber: 12, artist: 'Coti', title: 'No dudes' },
        { trackNumber: 13, artist: 'Coti', title: 'Bajarás' },
        { trackNumber: 14, artist: 'Coti', title: 'Contra todos los males de este mundo' },
        { trackNumber: 1, title: 'La Lanza', artist: 'Babasonicos' },
        { trackNumber: 9, title: 'Casi', artist: 'Babasonicos' },
        { trackNumber: 2, title: 'Aduana de Palabras', artist: 'Babasonicos' },
        { trackNumber: 10, title: 'Uno Tres Dos', artist: 'Babasonicos' },
        { trackNumber: 3, title: 'El Baile de Od+¡n', artist: 'Babasonicos' },
        { trackNumber: 11, title: 'Paisano', artist: 'Babasonicos' },
        { trackNumber: 4, title: 'Run Run', artist: 'Babasonicos' },
        { trackNumber: 12, title: 'Celof+ín', artist: 'Babasonicos' },
        { trackNumber: 5, title: 'Los Bur+¦cratas del Amor', artist: 'Babasonicos' },
        { trackNumber: 6, title: 'Negrita', artist: 'Babasonicos' },
        { trackNumber: 7, title: 'Uso', artist: 'Babasonicos' },
        { trackNumber: 8, title: 'Humo', artist: 'Babasonicos' },
      ];

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      availableSongs: SONGS,
      playlistSongs: []
    }
  }

  addToPlaylist(song){
    console.log('addToPlaylist');
    console.log(song);
    let newPlaylistSongs = this.state.playlistSongs;
    newPlaylistSongs.push(song);
    this.setState({playlistSongs: newPlaylistSongs});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Welcome to React</h1>
        </div>
        <Songslist addToPlaylist={this.addToPlaylist.bind(this)} songs={this.state.availableSongs}/>
        <Playlist songs={this.state.playlistSongs}/>
      </div>
    );
  }
}

export default App;
