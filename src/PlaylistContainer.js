import React from 'react';
import ListFilter from './ListFilter';
import ListBox from './ListBox';
import ListForm from './ListForm';

var playlists = [
    { name: "Gordos", counter: 0, blacklisted: false, key:1 },
    { name: "Colores", counter: 1, blacklisted: false, key:2 },
    { name: "Animales", counter: 3, blacklisted: true, key:3 }
];

var PlaylistContainer = React.createClass({
    getInitialState() {
        return {
            playlists,
            filteredPlaylists: playlists,
            filter: {
                name: '',
                min: undefined,
                max: undefined,
                hideBlacklisted: false
            }
        };
    },
    handleSubmit(playlist) {
        playlist.key = playlists.length + 1;
        playlist.counter = 0;
        playlists.push(playlist);
        this.setState({playlists});
    },
    handleIncrement(incrementedPlaylist) {
        var index = this.getIndex(incrementedPlaylist);
        var playlists = this.state.playlists;

        playlists[index].counter++;
        this.setState({ playlists });
    },
    handleBlacklistToggling(blacklistedPlaylist) {
        var index = this.getIndex(blacklistedPlaylist);
        var playlists = this.state.playlists;

        playlists[index].blacklisted = !playlists[index].blacklisted;
        this.setState({ playlists: this.state.playlists });
    },
    handleFilterChange(options) {
        var filter = Object.assign({}, this.state.filter, options);
        console.log(options);
        console.log(filter);
        var filteredPlaylists = this.state.playlists.filter(this.passFilter(filter))

        this.setState({filteredPlaylists, filter})
    },
    render() {
        return (
            <div>
                <ListFilter
                    handleFilterChange={this.handleFilterChange}
                    options={this.state.options}
                />
                <ListBox
                    data={this.state.filteredPlaylists}
                    handleIncrement={this.handleIncrement}
                    handleBlacklistToggling={this.handleBlacklistToggling}
                />
                <ListForm handleSubmit={this.handleSubmit} />
            </div>
        );
    },
    getIndex(modifiedPlaylist) {
        return this.state.playlists.findIndex(function (playlist) {
            return playlist.key === modifiedPlaylist.key;
        });
    },
    passFilter(filter) {
        return function(playlist) {
            if (filter.min && filter.min > playlist.counter) {
                return false;
            }
            if (filter.max && filter.max < playlist.counter) {
                return false;
            }

            if (filter.hideBlacklisted && playlist.blacklisted) {
                return false;
            }
            if (filter.name && playlist.name.indexOf(filter.name) === -1) {
                return false;
            }

            return true;
        }
    }
});

export default PlaylistContainer;
