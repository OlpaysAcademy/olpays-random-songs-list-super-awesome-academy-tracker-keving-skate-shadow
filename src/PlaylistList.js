import _ from  'lodash';
import React, { Component } from 'react';
import Radium from 'radium';
import R from 'ramda';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';

import styles from './styles';
import { storage } from './Storage';

const DATABASE = 'playlists';
const findPlaylists = () => storage.find(DATABASE);
const createPlaylist = (name) => { storage.insert(DATABASE, { name, listened: 0, selected: false }); }
const deletePlaylist = (playlist) => { storage.delete(DATABASE, playlist.id); }
const updatePlaylist = (playlist) => { storage.update(DATABASE, playlist.id, playlist); }

class PlaylistList extends Component {
  constructor(props) {
    super(props);
    const playlists = findPlaylists() || [];
    this.state = {
      currentRandom: playlists.find(R.prop('selected')),
      listenedFilter: getMaxListenedFilter(playlists) + '',
      newPlaylistName: '',
      playlists,
    }
  }

  updateState(state = {}) {
    this.setState(R.merge({
      playlists: findPlaylists()
    }, state));
  }

  updatePlaylist(playlist, obj) {
    updatePlaylist(R.merge(playlist, obj))
  }

  handleNameChange(event) {
    this.setState({ newPlaylistName: event.target.value.trim() });
  }

  handleCreatePlaylist() {
    const name = this.state.newPlaylistName;
    if (!name.length === 0) { return; }
    createPlaylist(name);
    this.updateState({
      newPlaylistName: '',
    });
  }

  handleDelete(playlist) {
    deletePlaylist(playlist);
    this.updateState();
  }

  handleListen(playlist) {
    this.updatePlaylist(playlist, { listened: playlist.listened + 1 });
    this.updateState();
  }

  handleBlacklist(playlist) {
    if (playlist.selected) {
      alert('No can do');
      return;
    }
    this.updatePlaylist(playlist, { blacklisted: !playlist.blacklisted });
    this.updateState();
  }

  handleTheJuliMayorga() {
    const current = this.state.currentRandom;
    if (current) {
      this.updatePlaylist(current, { selected: false });
    }
    const listenedFilter = parseInt(this.state.listenedFilter, 10);
    const ids = R.pipe(
      R.reject(R.propEq('blacklisted', true)),
      R.reject(R.propSatisfies(R.lt(listenedFilter), 'listened')),
      R.map(R.prop('id'))
    )(this.state.playlists);

    const randomPlaylistIndex = _.random(0, ids.length - 1);
    const currentRandom = this.state.playlists.find(R.propEq('id', ids[randomPlaylistIndex]));
    this.updatePlaylist(currentRandom, { selected: true });
    this.updateState({ currentRandom });
  }

  handleListenedTimes(event, index, value) {
    this.setState({ listenedFilter: value });
  }

  render() {
    const max = getMaxListenedFilter(this.state.playlists) + 1;

    const iconButtonElement = (
      <IconButton
        touch={true}
        >
        <MoreVertIcon />
      </IconButton>
    );

    const rightIconMenu = (playlist) => (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onClick={() => this.props.onPlaylistSelect(playlist.id) }>Show</MenuItem>
        <MenuItem onClick={() => this.handleListen(playlist) }>Listen</MenuItem>
        <MenuItem onClick={() => this.handleDelete(playlist) }>Delete</MenuItem>
        <MenuItem onClick={() => this.handleBlacklist(playlist) }>
          {playlist.blacklisted ? 'Yay' : 'Nay'}
        </MenuItem>
      </IconMenu>
    );

    return (
      <div>
        <AppBar
          title="Playlists"
          />
        <SelectField
          value={this.state.listenedFilter}
          hintText="Filter By Listened"
          onChange={(event, i, val) => this.handleListenedTimes(event, i, val) }>
          {_.times(max, n => (
            <MenuItem key={n} value={n + ''} primaryText={n + ''} />
          )) }
        </SelectField>
        <RaisedButton
          label="Do the Juli Mayorga"
          secondary={true}
          style={styles.margin10}
          onClick={() => this.handleTheJuliMayorga() }
          />
        {this.state.playlists.length === 0 &&
          <RaisedButton
            label="Get outta here with yo no playlists"
            disabled={true}
            fullWidth={true}
            style={styles.margin10}
            />
        }
        <List>
          {this.state.playlists.map(playlist =>
            <ListItem
              rightIconButton={rightIconMenu(playlist) }
              key={playlist.id}
              primaryText={`${playlist.name} (${playlist.listened})`}
              style={maybeHighlight(playlist.selected) }
              innerDivStyle={maybeStrike(playlist.blacklisted) }
              />
          ) }
        </List>
        <TextField
          hintText="New Playlist Name"
          value={this.state.newPlaylistName}
          onChange={(event) => this.handleNameChange(event) }
          />
        <RaisedButton
          label="Add Playlist"
          primary={true}
          style={styles.margin10}
          onClick={() => this.handleCreatePlaylist() }
          />
      </div>
    );
  }
}

function maybeHighlight(condition = false) {
  if (!condition) { return {} }
  return {
    'boxShadow': 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
    'background': 'rgb(255, 64, 129)'
  };
}

function maybeStrike(condition = false) {
  if (!condition) { return {} }
  return {
    'textDecoration': 'line-through',
    'color': 'gray'
  };
}

function getMaxListenedFilter(playlists) {
  return R.pipe(
    R.map(R.prop('listened')),
    _.max
  )(playlists);
}

PlaylistList.propTypes = {
  onPlaylistSelect: React.PropTypes.func.isRequired
}

export default Radium(PlaylistList);