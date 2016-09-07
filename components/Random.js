import React from 'react';

class Random extends React.Component {
    constructor() {
        super();
        this.state = { counterFilter: '' };
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onClick(){
        this.props.onRandomClick(this.state.counterFilter);
    }
    onChange(e){
        this.setState({ counterFilter: e.target.value });
    }
    render() {
        return (
            <div>
                <label className="m-r-sm">Counter Filter</label>
                <input type="text" onChange={this.onChange} />
                <button className="m-l-sm btn btn-primary btn-sm" onClick={this.onClick}>Random</button>
                <div>{ this.props.randomPlaylist ? this.props.randomPlaylist : '' }</div>
            </div>
        );
    }
}

export default Random;
