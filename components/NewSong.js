import React from 'react';

const addSongForm = {
    marginTop: 25
};

class NewSong extends React.Component {
    constructor() {
        super();
        this.state = { artist: '', name: '' };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const newSong = {
            artist: this.state.artist,
            name: this.state.name,
            playlistId: this.props.playlist.id
        }
        this.props.onSongSubmit(newSong);
        this.setState({ artist: '', name: '' });
        this.refs.artist.focus();
        return;
    }
    onChange(input, e){
        const change = {};
        change[input] = e.target.value;
        this.setState(change);
    }
    render() {
        return (
            <form style={addSongForm} onSubmit={this.handleSubmit}>
                <label className="m-r-sm">Artist</label>
                <input name="artist" ref='artist' type='text' onChange={this.onChange.bind(this, 'artist')} value={this.state.artist}/>
                <label className="m-r-sm">Song</label>
                <input name="name" ref='name' type='text' onChange={this.onChange.bind(this, 'name')} value={this.state.name}/>
                <button type='submit' className="btn btn-primary btn-xs m-l-sm">Add</button>
            </form>
        );
    }
}

export default NewSong;
