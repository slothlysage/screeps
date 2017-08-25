/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('work');
 * mod.thing == 'a thing'; // true
 */
var roles = require('roles');
var renew = require('renew');

module.exports = {
	run: function() {
		for (let name in Game.creeps) {
			var creep = Game.creeps[name];
//health check and death drop
			if (creep.ticksToLive == 1 && creep.carry.energy > 0) {
				console.log(creep.name + " dropped their load.");
				creep.drop(RESOURCE_ENERGY);
			}
			else if (creep.ticksToLive < 50) {
				creep.memory.health = "danger";
			}
			else if (creep.ticksToLive < 150) {
				creep.memory.health = "low";
			}
			else if (creep.ticksToLive < 300) {
				creep.memory.health = "high";
			}
//send to renew if not feeling well
//			if (creep.memory.health == "danger") {
//				renew.half(creep);
//			}
//			else if (creep.memory.health == "low") {
//				renew.full(creep);
//			}
//			else {
//assigning jobs
				if (creep.memory.role == 'harvester') {
					roles.harvester(creep);
				}
				else if (creep.memory.role == 'upgrader') {
					roles.upgrader(creep);
				}
				else if (creep.memory.role == 'builder') {
					roles.builder(creep);
				}
				else if (creep.memory.role == 'repairer') {
					roles.repairer(creep);
				}
				//else if (creep.memory.role =='runner') {
				//	runner.run(creep);
				//}
				//else if (creep.memory.role == 'miner') {
				//	miner.run(creep);
				//}
//			}
		}
	}
};
