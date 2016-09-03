import React, { Component } from 'react';

import InputGroup from './InputGroup';
import Button from './Button';
import Input from './Input';

import './RandomChooser.css';

class RandomChooser extends Component {
    chooseRandomPlaylist() {
        this.props.onSubmit();
    }
    render() {
        return (
            <InputGroup className="RandomChooser">
                <Input className="RandomChooser-input" type="text"/>
                <Button disabled={this.props.isDisabled} className="RandomChooser-button" onClick={() => this.chooseRandomPlaylist() }>Random!</Button>
            </InputGroup>
        );
    }
}

export default RandomChooser;
