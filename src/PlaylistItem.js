import React from 'react';

var PlaylistItem = React.createClass({
    increment() {
        this.props.handleIncrement(this.props.playlist);
    },
    toggleBlacklist() {
        this.props.handleBlacklistToggling(this.props.playlist);
    },
    render() {
        return (
            <tr>
                <td>
                    {this.props.playlist.name}
                </td>
                <td>
                    {this.props.playlist.counter}
                </td>
                <td>
                    <input type="button" value="+" onClick={this.increment} />
                </td>
                <td>
                    <input type="checkbox" defaultChecked={this.props.playlist.blacklisted} onClick={this.toggleBlacklist} />
                </td>
            </tr>
        );
    }
});

export default PlaylistItem;
