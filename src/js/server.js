/*global __dirname, console, require*/
'use strict';

const hapi = require('hapi'),
	server = new hapi.Server(),
	pkg = require('../../package');

server.connection({ "port": 8000 });

server.register([
	{ register: require('inert') },
	{ register: require('vision') },
	{ register: require('./route.js') },
	{
		register: require('../../plugins/rename/lib'),
		routes: { prefix: '/admin' }
	},
	{
		register: require('hapi-swagger'),
		options: { info: { title: 'history API', version: pkg.version } }
	}
], function (error) {
	const notifier = require('node-notifier'),
		hoek = require('hoek');

	hoek.assert(!error, error);
	var dust = require('dustjs-linkedin'),
		dustViews = require("fs").readFileSync("./public/views.min.js");
	
	require("tuxharness");
	dust.loadSource(dustViews);
	console.log('Views loaded to cache');

	server.start();
	console.log('Server running at ' + server.info.uri);
	notifier.notify({
        title: 'Server event',
        message: 'Running at ' + server.info.uri
    });
});

server.views({
	"defaultExtension": "dust",
	"engines": {
		"dust": require('hapi-dust')
	},
	"isCached": true,
	"path": '../views',
	"partialsPath": '../views',
	"relativeTo": __dirname
});