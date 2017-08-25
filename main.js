var graveyard = require('graveyard');
var work = require('work');
var spawn = require('spawner');

module.exports.loop = function () {
	graveyard.run();
	work.run();
	spawn.run();
}
