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
			var stor = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			    filter: (s) => (s.structureType == STRUCTURE_STORAGE)
			})
			if (struct != undefined) {
				if (creep.transfer(struct, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(struct);
				}
			}
			else if (stor != undefined) {
			    if (creep.transfer(stor, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			        creep.moveTo(stor);
			    }
			}
        }
        else {
			var pickup = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
			    filter: (p) => p.resourceType == RESOURCE_ENERGY
			});
			var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
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
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
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
				filter: s => (s.hits < 100000 && s.hits < s.hitsMax) && s.structureType != STRUCTURE_WALL});
			var walls = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			    filter: s => s.structureType == STRUCTURE_WALL && s.hits < 75000});
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
			creep.memory.working = false;
		}
		else if (creep.memory.working == false && creep.carry.energy == creep.carry.energyCapacity) {
			creep.memory.working = true;
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
  },
    ldharvester: function(creep) {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
	    if (creep.memory.working == true) {
            if (creep.room.name == creep.memory.home) {
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
                var exit = creep.room.findExitTo(creep.memory.home);
                creep.moveTo(creep.pos.findClosestByPath(exit));
            }
        }
        else {
            creep.say("workin");
            if (creep.room.name == creep.memory.target) {
                var pick = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
		        var source = creep.pos.findClosestByPath(FIND_SOURCES);
                if (pick && creep.pos.getRangeTo(pick) < creep.pos.getRangeTo(source)) {
			        if (creep.pickup(pick) == ERR_NOT_IN_RANGE) {
				        creep.moveTo(pick);
			        }
		        }
		        else {
		            creep.say("mining")
                    if (ret = creep.harvest(source) == ERR_NOT_IN_RANGE) {
		    		    creep.moveTo(source);
			        }
			        else if (creep.harvest(source) == ERR_NOT_OWNER) {
			            creep.say("thievin");
			        }
			    }
            }   
            else {
                var exit = creep.room.findExitTo(creep.memory.target);
                creep.moveTo(creep.pos.findClosestByPath(exit));
            }
        }
    },
    walkingDead: function(creep) {
        creep.say("☠️");
        if (Game.spawns.Spawn1.recycleCreep(creep) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.spawns.Spawn1);
		}
		else {
		    console.log(creep.name + "'s soul was harvested");
		}
    },
    extractor: function(creep) {
        if (creep.memory.working == true && _.sum(creep.carry) == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carryCapacity == _.sum(creep.carry)) {
            creep.memory.working = true;
        }
        if (creep.memory.working == true) {
            var stor = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			    filter: (s) => (s.structureType == STRUCTURE_STORAGE)})
			var mineral = creep.pos.findClosestByPath(FIND_MINERALS)
            if (creep.transfer(stor, mineral.mineralType) == ERR_NOT_IN_RANGE) {
                creep.moveTo(stor);
            }
        }
        else {
            var mineral = creep.pos.findClosestByPath(FIND_MINERALS);
            var pick = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
                filter: (p) => p.mineralType == mineral.mineralType
            })
            if (pick != undefined) {
                if (creep.pickup(pick) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(pick)
                }
            }
            if (creep.harvest(mineral) == ERR_NOT_IN_RANGE) {
                console.log("doop")
                creep.moveTo(mineral)
            }
        }
    },
    claimer: function(creep) {
        if (creep.room.name != creep.memory.target) {
            var exit = creep.room.findExitTo(creep.memory.target)
            creep.moveTo(creep.pos.findClosestByRange(exit))
        }
        else {
            if (creep.claimController(creep.room.contoller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.contoller)
            }
        }
    }
};
