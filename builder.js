/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('builder');
 * mod.thing == 'a thing'; // true
 */
var upgrader = require('upgrader');

module.exports = {
 run: function(creep) {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        
        if (creep.memory.working == true) {
			var construction = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
			if (construction != undefined) {
	            if (creep.build(construction) == ERR_NOT_IN_RANGE) {
		            creep.moveTo(construction);
			    }
			}
			else {
				upgrader.run(creep);
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
