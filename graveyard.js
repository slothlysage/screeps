/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('graveyard');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
	run: function() {
		for (let name in Memory.creeps) {
			if (Game.creeps[name] == undefined) {
				console.log(name + " has passed away...")
				delete Memory.creeps[name];
			}
		}
	}
};
