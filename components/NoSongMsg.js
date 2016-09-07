import React from 'react';

const headerContainer = {
    width: '100%',
    height: 80,
    background: 'black',
    display: 'flexbox',
    alignItems: 'center',
    justifyContent: 'center'
};

const noMessage = {
    marginTop: 150
};

const NoSongMsg = () => {
    return (
        <div className="text-center" style={noMessage}>
            <h3>Select a Playlist</h3>
        </div>
    );
}

export default NoSongMsg;
