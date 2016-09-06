import React, { Component } from 'react';
import Radium from 'radium';
import R from 'ramda';

import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Delete from 'material-ui/svg-icons/action/delete';
import TextField from 'material-ui/TextField';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import styles from './styles';
import { storage } from './Storage';

const DATABASE = 'songs';
const findPlaylist = (playlistId) => storage.findById('playlists', playlistId);
const findSongs = (playlistId) => storage.query(DATABASE, { playlist: playlistId });
const createSong = (playlistId, name) => { 
    storage.insert(DATABASE, { 
        name,
        playlist: playlistId,
    }); 
}
const deleteSong = (song) => { storage.delete(DATABASE, song.id); }

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: findPlaylist(this.props.playlistId),
      songs: findSongs(this.props.playlistId) || [],
      newSongName: ''
    }
  }

  updateState(state = {}) {
    this.setState(R.merge({
      songs: findSongs(this.props.playlistId)
    }, state));
  }

  handleNameChange(event) {
    this.setState({ newSongName: event.target.value.trim() });
  }

  handleCreateSong() {
    const name = this.state.newSongName;
    if (!name.length === 0) { return; }
    createSong(this.props.playlistId, name);
    this.updateState({
      newSongName: '',
    });
  }

  handleDelete(song) {
    deleteSong(song);
    this.updateState();
  }

  render() {
    const iconButtonElement = (song) => (
      <IconButton
        touch={true}
        onClick={() => this.handleDelete(song)}
        >
        <Delete />
      </IconButton>
    );

    return (
      <div>
        <AppBar
          title={`Playlist: ${this.state.playlist.name} (${this.state.playlist.listened})`}
          style={{'background': 'rgb(255, 64, 129)'}}
          iconElementRight={
            <IconButton onClick={() => this.props.onPlaylistClose()}>
              <NavigationClose />
            </IconButton>
          }
          />
        {this.state.songs.length === 0 &&
          <RaisedButton
            label="This is a poor playlist"
            disabled={true}
            fullWidth={true}
            style={styles.margin10}
            />
        }
        <List>
          {this.state.songs.map(song =>
            <div key={'wrapper' + song.id}>
              <ListItem
                rightIconButton={iconButtonElement(song) }
                key={song.id}
                primaryText={song.name}
                />
              <Divider key={'divider' + song.id} inset={true} />
            </div>
          ) }
        </List>
        <TextField
          hintText="New Song Name"
          value={this.state.newSongName}
          onChange={(event) => this.handleNameChange(event) }
          />
        <RaisedButton
          label="Add Song"
          primary={true}
          style={styles.margin10}
          onClick={() => this.handleCreateSong() }
          />
      </div>
    );
  }
}



export default Radium(Playlist);