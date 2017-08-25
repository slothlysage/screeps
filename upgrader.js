/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('upgrader');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
run: function(creep) {
		if(creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
		if (creep.memory.working == true) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
			var pickup = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (pickup && creep.pos.getRangeTo(pickup) < creep.pos.getRangeTo(source)) {
				if (creep.pickup(pickup) == ERR_NOT_IN_RANGE) {
					creep.moveTo(pickup);
				}
			}
			else {
				if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
					creep.moveTo(source);
				}
            }
        }
    }
};
