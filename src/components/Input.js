import React from 'react';

import { mergeClassNames } from '../utils/styles';

import './Input.css';

const Input = props => {
    const className = mergeClassNames(props.className, 'Input');
    return <input {...props} className={className} />;
};

export default Input;