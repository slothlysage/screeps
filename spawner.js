/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawner');
 * mod.thing == 'a thing'; // true
 */
var minHarvesters = 10;
var minUpgraders = 1;
var minBuilders = 1;
var minRepairers = 2;

module.exports = {
	run: function() {
		var numHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester')
		var numUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader')
		var numBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder')
		var numRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer')
		var name = undefined;
		if (numHarvesters < minHarvesters) {
			if (numHarvesters < minHarvesters / 2) {
				name = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined,
					{ role: 'harvester', working: false});
			}
			else {
				name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
					{ role: 'harvester', working: false});
			}
			if (!(name < 0)) {
				console.log("New harvester created.");
			}
		}
		else if (numUpgraders < minUpgraders) {
			name = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE,MOVE], undefined,
				{ role: 'upgrader', working: false});
			if (!(name < 0)) {
				console.log("New upgrader created.");
			}
		}
		else if (numBuilders < minBuilders) {
			name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
				{ role: 'builder', working: false});
			if (!(name < 0)) {
				console.log("New builder created.");
			}
		}
		else if (numRepairers < minRepairers) {
			name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
				{ role: 'repairer', working: false});
			if (!(name < 0)) {
				console.log("New repairer created.");
			}
		}
		else {
			name = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE,MOVE], undefined,
				{ role: 'builder', working: false});
			if (!(name < 0)) {
				console.log("New builder created.");
			}
		}
		if (!(name < 0)) {
			console.log("Hi! My name is " + name + ".");
		}
	}
};
