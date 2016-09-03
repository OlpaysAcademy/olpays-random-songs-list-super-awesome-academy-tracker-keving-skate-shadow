import React from 'react';

import classNames from 'classnames';

import './Input.css';

const Input = props => {
    const className = classNames(props.className, 'Input');
    return <input {...props} className={className} />;
};

export default Input;