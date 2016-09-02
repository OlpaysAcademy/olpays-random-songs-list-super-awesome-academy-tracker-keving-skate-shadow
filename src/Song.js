import React, { Component } from 'react';

class Song extends Component {
  handleClick(){
    console.log('handleClick');
    this.props.addToPlaylist(this.props.song);
  }
  render() {
    return (
      <li onClick={() => this.handleClick()}>Titulo: {this.props.song.title} Artist: {this.props.song.artist}</li>
    );
  }
}

export default Song;
