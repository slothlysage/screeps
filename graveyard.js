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
				console.log(name + " was forgotten...")
				delete Memory.creeps[name];
			}
		}
		for (let name in Game.creeps) {
		    var creep = Game.creeps[name];
	        if (creep.ticksToLive - 25 < creep.pos.getRangeTo(Game.spawns.Spawn1) && 
	        creep.memory.role != 'ldharvester' &&
	        creep.memory.role != 'claimer') {
	            creep.memory.role = 'walkingdead';
		    }
		}
	}
};
