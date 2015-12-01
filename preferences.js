'use strict';
var out = {
    hostPort: 9001,
    hostName: 'localhost',
    proxyHost: 'https://localhost/mine',
    dir: {
        app: 'app',
        tmp: 'dist',
        appHome: ''
    },
    proxyUrls: [
        "/hds/*",
        "/rs/*"
    ]
};
module.exports = out;