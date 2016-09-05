import React from 'react';

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
            playlistId: this.props.playlistId
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
            <form onSubmit={this.handleSubmit}>
                <input ref='artist' type='text' onChange={this.onChange.bind(this, 'artist')} value={this.state.artist}/>
                <input ref='name' type='text' onChange={this.onChange.bind(this, 'name')} value={this.state.name}/>
                <input type='submit' value='Add'/>
            </form>
        );
    }
}

export default NewSong;
