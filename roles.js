//All the roles in one file 
var help = require('helper');

module.exports = {
    harvester: function(creep) {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
		if (creep.memory.working == true) {
            var struct = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
				filter: (s) => (s.structureType == STRUCTURE_SPAWN ||
				s.structureType == STRUCTURE_EXTENSION ||
				s.structureType == STRUCTURE_TOWER) &&
				s.energy < s.energyCapacity });
			if (struct != undefined) {
				if (creep.transfer(struct, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(struct);
				}
			}
        }
        else {
			var pickup = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
			var source = creep.pos.findClosestByPath(FIND_SOURCES);
			if (pickup && creep.pos.getRangeTo(pickup) < (2 * creep.pos.getRangeTo(source))) {
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
    },
    upgrader: function(creep) {
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
    },
    builder: function(creep) {
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
				this.upgrader(creep);
			}
        }
        else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    },
    repairer: function(creep) {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        
        if (creep.memory.working == true) {
			var toRepair = creep.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: s => (s.hits < 50000 && s.hits < s.hitsMax) && s.structureType != STRUCTURE_WALL});
			var walls = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			    filter: s => s.structureType == STRUCTURE_WALL && s.hits < 20000});
			if (toRepair != undefined) {
	            if (creep.repair(toRepair) == ERR_NOT_IN_RANGE) {
		            creep.moveTo(toRepair);
			    }
			}
			else if (walls != undefined) {
			    if (creep.repair(walls) == ERR_NOT_IN_RANGE) {
			        creep.moveTo(walls);
			    }
			}
			else {
				this.builder(creep);
			}
        }
        else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    },
    runner: function(creep) {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        if (creep.memory.working == true) {
            var struct = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
				filter: (s) => (s.structureType == STRUCTURE_SPAWN ||
				s.structureType == STRUCTURE_EXTENSION) &&
				s.energy < s.energyCapacity });
			if (struct != undefined) {
				if (creep.transfer(struct, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(struct);
				}
			}
        }
        else {
			var pickup = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
			if (pickup && creep.pos.getRangeTo(pickup)) {
				if (creep.pickup(pickup) == ERR_NOT_IN_RANGE) {
					creep.moveTo(pickup);
				}
			}
			else {
                var source = creep.pos.findClosestByPath(FIND_SOURCE);
				if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
					creep.moveTo(source);
				}
			}
        }
    },
    miner: function(creep) {
		if (creep.memory.working == true && creep.carry.energy == 0) {
			creep.memory.working == false;
		}
		else if (creep.memory.working == false && creep.carry.energy == creep.carry.energyCapacity) {
			creep.memory.working == true;
		}
		if (creep.memory.working == true) {
			creep.drop.energy;
		}
		else {
			var sources = find(FIND_SOURCES);
			if (creep.harvest(source[creep.memory.source]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(source[creep.memory.source]);
				help.autoRoad(creep);
			}
		}
    }
};
