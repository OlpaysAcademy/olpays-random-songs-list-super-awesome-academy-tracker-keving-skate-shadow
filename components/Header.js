import React from 'react';

const headerContainer = {
    width: '100%',
    height: 80,
    background: 'black',
    display: 'flexbox',
    alignItems: 'center',
    justifyContent: 'center'
};

const headerTitle = {
    color: 'white',
    marginLeft: 50
};

const Header = () => {
    return (
        <div style={headerContainer}>
            <div className="row">
                <div style={headerTitle}>
                    <h2>Playlist Crapper</h2>
                </div>
            </div>
        </div>
    );
};

export default Header;
