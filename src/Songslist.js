import React, { Component } from 'react';
import Song from './Song'

class Songslist extends Component {
  render() {
    return (
      <div className='Songslist'>
      <h2>Lista de canciones disponibles</h2>
      <ul>
      {this.props.songs.map((song) => {
        return (<Song addToPlaylist={this.props.addToPlaylist} song={song} />);
      })}
      </ul>
      </div>
    )
  }
}

export default Songslist;