import React, { Component } from 'react';
import PlaylistItem from './PlaylistItem';

class ListBox extends Component {
    render() {
        var handleIncrement = this.props.handleIncrement;
        var handleBlacklistToggling = this.props.handleBlacklistToggling;
        var playlistNodes = this.props.data.map(function(playlist) {
            return (
                <PlaylistItem
                    playlist={playlist}
                    key={playlist.key}
                    handleIncrement={handleIncrement}
                    handleBlacklistToggling={handleBlacklistToggling}
                />
            );
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Counter</th>
                        <th>Increment</th>
                        <th>Blacklisted</th>
                    </tr>
                </thead>
                <tbody>{playlistNodes}</tbody>
            </table>
        );
    }
}

export default ListBox;
