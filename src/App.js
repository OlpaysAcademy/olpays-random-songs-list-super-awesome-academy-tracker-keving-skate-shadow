import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Radium from 'radium';

import PlaylistList from './PlaylistList';
import Playlist from './Playlist';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlaylist: /* 1473175701898 */ undefined
    };
  }

  handlePlaylistSelect(selectedPlaylist) {
    this.setState({ selectedPlaylist });
  }

  handlePlaylistClose() {
    this.setState({ selectedPlaylist: undefined });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
        {!this.state.selectedPlaylist && 
          <PlaylistList 
            onPlaylistSelect={(selectedPlaylist) => this.handlePlaylistSelect(selectedPlaylist)}/>
        }
        {this.state.selectedPlaylist && 
          <Playlist 
            playlistId={this.state.selectedPlaylist} 
            onPlaylistClose={() => this.handlePlaylistClose() }/>
        }
        </div>
      </MuiThemeProvider>
    );
  }
}
export default Radium(App);