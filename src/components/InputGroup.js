import React from 'react';

import classNames from 'classnames';

import './InputGroup.css';

const InputGroup = props => {
    const className = classNames(props.className, 'InputGroup');
    return <div {...props} className={className}>{props.children}</div>
}

export default InputGroup;