import React, { Component } from 'react';
import classNames from 'classnames';

import Input from './Input';

import './Songs.css';

class Songs extends Component {
    constructor() {
        super();
        this.state = {
            songName: ''
        };
    }
    onEnter(ev) {
        if (ev.key === 'Enter') {
            this.props.onAddSong(this.state.songName);
            this.clearInput();
        }
    }
    handleChange(event) {
        this.setState({ songName: event.target.value });
    }
    clearInput() {
        this.setState({
            songName: ''
        });
    }
    render() {
        const className = classNames(this.props.className, 'Songs');
        return (
            <div className={className}>
                <Input className='Playlist-SongInput-Input' type="text" onKeyPress={(ev) => this.onEnter(ev) } placeholder="Agregar nueva canción" value={this.state.songName} onChange={ev => this.handleChange(ev) } />
                <div className="Playlist-SongList">
                    {this.props.songs.map(song => <div className="Song">{song}</div>) }
                </div>
            </div>
        );
    }
};

export default Songs;