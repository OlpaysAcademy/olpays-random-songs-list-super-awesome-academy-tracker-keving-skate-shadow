import React, { Component } from 'react';
import classNames from 'classnames';

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
        const className = classNames(this.props.className, 'RandomChooser');
        return (
            <InputGroup className={className}>
                <Input onChange={ev => this.handleChange(ev) } placeholder="Filtrar por minimo de escuchas" className="RandomChooser-input" type="number"/>
                <Button disabled={this.props.isDisabled} className="RandomChooser__button" onClick={() => this.chooseRandomPlaylist() }>Randomear!</Button>
            </InputGroup>
        );
    }
}

export default RandomChooser;
