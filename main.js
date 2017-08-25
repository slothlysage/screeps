var graveyard = require('graveyard');
var work = require('work');
var spawn = require('spawner');
require ('big.worker')();

module.exports.loop = function () {
	graveyard.run();
	work.run();
	spawn.run();
}
