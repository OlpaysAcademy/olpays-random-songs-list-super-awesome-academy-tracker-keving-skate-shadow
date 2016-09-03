import React from 'react';

import classNames from 'classnames';

import './Button.css';

const Button = props => {
    const className = classNames(props.className, 'Button');
    return <button {...props} className={className}>{props.children}</button>
}

export default Button;