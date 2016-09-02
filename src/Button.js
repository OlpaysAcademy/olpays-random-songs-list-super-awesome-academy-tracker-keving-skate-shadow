import React from 'react';

import { mergeClassNames } from './utils/styles';

import './Button.css';

const Button = props => {
    const className = mergeClassNames(props.className, 'Button');
    return <button {...props} className={className}>{props.children}</button>
}

export default Button;