import shuffle from 'lodash/shuffle';

export function shufflePlaylists(playlists) {
    const blacklisted = playlists.filter(playlist => playlist.isBlacklisted);
    const nonBlacklisted = playlists.filter(playlist => !playlist.isBlacklisted);
    return shuffle(nonBlacklisted).concat(blacklisted);
}

export function createPlaylists() {
    return [];
}

export function addPlaylist(playlists, title) {
    return playlists.concat([createPlaylist(title)]);
}

function createPlaylist(title) {
    return {
        title,
        id: Math.random(),
        timesPlayed: 0,
        isVisible: true,
        isBlacklisted: false,
        songs: []
    };
}

export function isPlaylistVisible(playlist, timesPlayed) {
    return playlist.timesPlayed >= timesPlayed;
}

export function increaseTimesPlayed(playlists, id) {
    return updatePlaylist(
        playlists,
        id,
        playlist => {
            playlist.timesPlayed += 1
            return playlist;
        }
    );
}

export function toggleBlacklist(playlists, id) {
    return updatePlaylist(
        playlists,
        id,
        playlist => {
            playlist.isBlacklisted = !playlist.isBlacklisted;
            return playlist;
        }
    );
}

function updatePlaylist(playlists, id, updater) {
    return playlists.map(playlist => playlist.id === id ? updater(playlist) : playlist);
}

export function addSong(playlists, id, name) {
    return updatePlaylist(
        playlists,
        id,
        playlist => {
            playlist.songs.push(name);
            return playlist;
        }
    );
}