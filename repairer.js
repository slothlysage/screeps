/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('repairer');
 * mod.thing == 'a thing'; // true
 */
var builder = require('builder');

module.exports = {
 run: function(creep) {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        
        if (creep.memory.working == true) {
			var toRepair = creep.pos.findClosestByPath(FIND_STRUCTURES,
				{ filter: (s) => s.hit < s.hitsMax && s.structureType != STUCTURE_WALL});
			if (toRepair != undefined) {
	            if (creep.repair(toRepair) == ERR_NOT_IN_RANGE) {
		            creep.moveTo(toRepair);
			    }
			}
			else {
				builder.run(creep);
			}
        }
        else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }
};
