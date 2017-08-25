//inclusion prototype for createBigWorker overlay of createCreep
require ('big.worker')();

module.exports = {
	run: function() {
		//dictates minimum required worker types
		var minHarvesters = 4;
		var minUpgraders = 1;
		var minBuilders = 1;
		var minRepairers = 2;
		//gets current count of every worker
		var numHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester')
		var numUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader')
		var numBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder')
		var numRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer')
		//available energy of Spawn1 *needs to be updated to all spawns*
		var maxEnergy = Game.spawns.Spawn1.room.energyCapacityAvailable;
		var availEnergy = Game.spawns.Spawn1.room.energyAvailable;
		var name = undefined;
		//code to spawn custom sized creeps based on available energy accessable by spawn prioritized by need and minimums
		if (numHarvesters < minHarvesters) {
			name = Game.spawns.Spawn1.createBigWorker(maxEnergy, 'harvester');
			if (name == ERR_NOT_ENOUGH_ENERGY && numHarvesters == 0) {
				name = Game.spawns.Spawn1.createBigWorker(availEnergy, 'harvester');
			}
			if (!(name < 0)) {
				console.log("New harvester created.");
			}
		}
		else if (numUpgraders < minUpgraders) {
			name = Game.spawns.Spawn1.createBigWorker(maxEnergy, 'upgrader');
			if (!(name < 0)) {
				console.log("New upgrader created.");
			}
		}
		else if (numBuilders < minBuilders) {
			name = Game.spawns.Spawn1.createBigWorker(maxEnergy, 'builder');
			if (!(name < 0)) {
				console.log("New builder created.");
			}
		}
		else if (numRepairers < minRepairers) {
			name = Game.spawns.Spawn1.createBigWorker(maxEnergy, 'repairer');
			if (!(name < 0)) {
				console.log("New repairer created.");
			}
		}
		else {
			name = Game.spawns.Spawn1.createBigWorker(maxEnergy, 'repairer');
			if (!(name < 0)) {
				console.log("New repairer created.");
			}
		}
		if (!(name < 0)) {
			console.log("Hi! My name is " + name + ".");
		}
	}
};
