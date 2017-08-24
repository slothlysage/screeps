var roleHarvester = require('harvester');
var roleUpgrader = require('upgrader');
var minHarvesters = 10;

module.exports.loop = function () {
	//graveyard
	for (let name in Memory.creeps) {
		if (Game.creeps[name] == undefined) {
			console.log(name + " has passed away...")
			delete Memory.creeps[name];
		}
	}
	//running creeps
	for (let name in Game.creeps) {
		var creep = Game.creeps[name];
		if (creep.memory.role == 'harvester') {
			roleHarvester.run(creep);
		}
		if (creep.memory.role == 'upgrader') {
			roleUpgrader.run(creep);
		}
    }
	//generating creeps
	var numHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester')
	var name = undefined;
	if (numHarvesters < minHarvesters) {
		name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
			{ role: 'harvester', working: false});
		if (!(name < 0)) {
			console.log("New harvester created.");
		}
	}
	else {
		name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
			{ role: 'upgrader', working: false});
		if (!(name < 0)) {
			console.log("New upgrader created.");
		}
	}
	if (!(name < 0)) {
		console.log("Hi! My name is " + name + ".");
	}
}
