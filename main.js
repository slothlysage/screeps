var graveyard = require('graveyard');
var work = require('work');
var spawn = require('spawnTypes');

module.exports.loop = function () {
	graveyard.run();
	work.run();
	spawn.basic();
}
