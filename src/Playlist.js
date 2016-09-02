import React, { Component } from 'react';
import Song from './Song'

class Playlist extends Component {
  render() {
    return (
      <div className='Playlist'>
      <h2>La playlist</h2>
      <ul>
      {this.props.songs.map((song) => {
        return (<Song song={song} />);
      })}
      </ul>
      </div>
    )
  }
}

export default Playlist;