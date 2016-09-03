import React from 'react';

/*
 * SVG Icon System
 *
 *  You can add svg images to html elements using <img src=""> or styling them with background-image=url("")
 *  The problem is that you cannot modify attributes like color.
 *  Using react we can create our own svg icon systems!
 *  For more info: https://css-tricks.com/creating-svg-icon-system-react/
 */

const Music = props => {
    const { width = 600, height = 600, fill = 'black'} = props;
    return (
        <svg {...props} viewBox="0 0 556 601" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
            <g fill={fill} fillRule="evenodd">
                <path d="M149.932 82.625L555.104 0v112.988l-405.172 82.626V82.624z"/>
                <path d="M149.932 82.538h65.23v422.367h-65.23V82.538z"/>
                <path d="M213.042 488.204c11.655 43.498-25.912 91.357-83.91 106.898-57.996 15.54-114.46-7.124-126.116-50.622-11.655-43.498 25.913-91.357 83.91-106.898 57.997-15.54 114.46 7.124 126.116 50.622zM489.874 13.54h65.23v422.367h-65.23V13.54z"/>
                <path d="M552.984 419.207c11.655 43.498-25.913 91.357-83.91 106.898-57.997 15.54-114.46-7.124-126.116-50.622-11.655-43.498 25.912-91.358 83.91-106.898 57.996-15.54 114.46 7.124 126.116 50.622z"/>
            </g>
        </svg>
    )
};

export default Music;