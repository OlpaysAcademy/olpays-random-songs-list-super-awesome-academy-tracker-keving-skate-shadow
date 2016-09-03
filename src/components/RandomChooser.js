import React, { Component } from 'react';

import InputGroup from './InputGroup';
import Button from './Button';
import Input from './Input';

import './RandomChooser.css';

class RandomChooser extends Component {
    chooseRandomPlaylist() {
        this.props.onSubmit();
    }
    handleChange(event) {
        this.props.onFilter(parseInt(event.target.value, 10) || 0);
    }
    render() {
        return (
            <InputGroup className="RandomChooser">
                <Input onChange={ev => this.handleChange(ev) } placeholder="Minimum played times" className="RandomChooser-input" type="number"/>
                <Button disabled={this.props.isDisabled} className="RandomChooser-button" onClick={() => this.chooseRandomPlaylist() }>Random!</Button>
            </InputGroup>
        );
    }
}

export default RandomChooser;
