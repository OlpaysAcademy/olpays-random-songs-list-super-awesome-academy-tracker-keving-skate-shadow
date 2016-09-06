import React from 'react';

class NewPlaylist extends React.Component {
    constructor() {
        super();
        this.state = { newPlaylist: '' };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.onFormSubmit(this.state.newPlaylist);
        this.setState({newPlaylist: ''});
        this.refs.newPlaylist.focus();
        return;
    }
    onChange(e){
        this.setState({
            newPlaylist: e.target.value
        });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>New Playlist</label>
                <input ref='newPlaylist' type='text' onChange={this.onChange} value={this.state.newPlaylist}/>
                <input type='submit' value='Add'/>
            </form>
        );
    }
}

export default NewPlaylist;
