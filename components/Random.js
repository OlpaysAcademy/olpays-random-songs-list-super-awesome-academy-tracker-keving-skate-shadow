import React from 'react';

class Random extends React.Component {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }
    onClick(){
        this.props.onRandomClick();
    }
    render() {
        return (
            <div>
                <button onClick={this.onClick}>Randomero</button>
                <div>{ this.props.randomPlaylist ? this.props.randomPlaylist : '' }</div>
            </div>
        );
    }
}

export default Random;
