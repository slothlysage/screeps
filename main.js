var graveyard = require('graveyard');
var work = require('work');
var spawn = require('spawnTypes');
var tower = require('tower');

module.exports.loop = function () {
	tower.kill();
	graveyard.run();
	work.run();
	spawn.experimental();
//	spawn.basic();
}
