import React from 'react';

const inputLabel = {
    marginRight: 5
};

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
                <label style={inputLabel}>New Playlist</label>
                <input ref='newPlaylist' type='text' onChange={this.onChange} value={this.state.newPlaylist}/>
                <button  className="btn btn-primary btn-sm m-l-sm" type='submit'>Add</button>
            </form>
        );
    }
}

export default NewPlaylist;
