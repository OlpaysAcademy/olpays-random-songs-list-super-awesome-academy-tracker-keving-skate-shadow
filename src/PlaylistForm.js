import React, { Component } from 'react';

import Button from './Button';
import Input from './Input';

import './PlaylistForm.css';

// React vs ES6 classes
// React recommends using ES6 classes instead of React.createClass
// They plan on deprecating createClass in the future
// https://facebook.github.io/react/blog/2015/03/10/react-v0.13.html

// Function binding
// createClass: every property that is a function gets bound to this
// ES6 class: you must manually bind every property that is a function
// Possible solutions:
// * you can use .bind()
// * you can bind functions in the constructor
// * you can use arrow functions
// https://daveceddia.com/react-es5-createclass-vs-es6-classes/

// Olpays convention
// We are going to use ES6 classes
// We are going to use arrow functions for function binding.
// We think they let you clearly state the parameter that a function receives
// e.g. onChange={ev => this.handleChange(ev)}
class PlaylistForm extends Component {
    constructor() {
        super();
        this.state = {
            playlist: {
                title: ''
            }
        };
    }
    handleChange(event) {
        this.setState({ playlist: { title: event.target.value } });
    }
    createPlaylist() {
        this.props.onSubmit(this.state.playlist);
        this.clearInput();
    }
    onEnter(ev) {
        if (ev.key === 'Enter') {
            this.createPlaylist();
        }
    }
    clearInput() {
        this.setState({
            playlist: {
                title: ''
            }
        });
    }
    render() {
        return (
            <div className="PlaylistForm">
                <Input className="PlaylistForm-input" type="text" onKeyPress={(ev) => this.onEnter(ev) } value={this.state.playlist.title} onChange={ev => this.handleChange(ev) } />
                <Button className="PlaylistForm-button" onClick={() => this.createPlaylist() }>Crear</Button>
            </div>
        );
    }
}

export default PlaylistForm;
