var spotify = require('spotify');
var fs = require('fs');


function getSong(title, callback) {
    var params = {
        type: 'track',
        query: (title != '') ? title : "The Sign"
    }

    spotify.search(params, function(err, data) {

        if (err) {
            callback(err, null);
            return;
        }

        var track = null;

        data.tracks.items.forEach(function(i) {
            if (i.name.toLowerCase() == params.query.toLowerCase()) track = i;
        })

        if (track == null) {
            console.log("Song not in Spotify database!");
            log('\nspotify-this', "Song not in Spotify database!");
            callback(null, null);
        }

        var artists = track.album.artists.reduce(function(s, el, i) {
            s += el.name;
            if (i != track.album.artists.length-1) s += ', ';
            return s;
        }, '');

        var url = (track.preview_url == null) ? 'N/A' : track.preview_url;
        var s = '';
        s += '\nArtists(s): ' + artists +
            '\nName: ' + track.name +
            '\nPreview link from Spotify: ' + url +
            '\nAlbum: ' + track.album.name;

        console.log(s);
        log('\nspotify-this', s);

        callback(null, data);

    });
}

function log(command, data) {

    var s = command + '\n' + data;

    fs.appendFile('./log.txt', s, function(err) {
        if (err) console.log(err);
    });

}

module.exports = getSong;