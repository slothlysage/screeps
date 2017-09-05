/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('big.worker');
 * mod.thing == 'a thing'; // true
 */

module.exports = function() {
	StructureSpawn.prototype.createFastRunner =
	function(energy, roleName) {
		var numParts = Math.floor(energy / 200);
		var body = [];
		for (let i = 0; i < numParts; i++) {
			body.push(CARRY);
		}
		for (let i = 0; i < numParts; i++) {
			body.push(MOVE);
			body.push(MOVE);
		}
		return this.createCreep(body, undefined, { role: roleName, working: false, health: "full"});
	};
	StructureSpawn.prototype.createLdHarvester =
		function(energy, numWorkParts, home, target, sourceId) {
			var body = [];
			for (let i = 0; i < numWorkParts; i++) {
				body.push(WORK);
			}
			energy -= 100 * numWorkParts;
			var numParts = Math.floor(energy / 100);
			for (let i = 0; i < numParts; i++) {
				body.push(CARRY);
			}
			for (let i = 0; i < numParts; i++) {
				body.push(MOVE);
			}
			return this.createCreep(body, undefined, {
				role: 'ldharvester',
				home: home,
				target: target,
				sourceID: sourceId,
				working: false,
				health: "full"});
		};
	StructureSpawn.prototype.createSlowMiner =
	function(energy, roleName) {
		var numParts = Math.floor(energy / 200);
		var body = [];
		for (let i = 0; i < numParts; i++) {
			body.push(WORK);
			body.push(WORK);
		}
		body.push(CARRY);
		for (let i = 0; i < numParts; i++) {
			body.push(MOVE);
		}
		return this.createCreep(body, undefined, { role: roleName, working: false, health: "full"});
	};
	StructureSpawn.prototype.createBigWorker =
		function(energy, roleName) {
			var numParts = Math.floor(energy / 200);
			var body = [];
			for (let i = 0; i < numParts; i++) {
				body.push(WORK);
				body.push(CARRY);
			}
			for (let i = 0; i < numParts; i++) {
				body.push(MOVE);
			}
			return this.createCreep(body, undefined, { role: roleName, working: false, health: "full"});
	};
	StructureSpawn.prototype.createClaimer =
	    function(target) {
	        return this.createCreep([MOVE, CLAIM], undefined, {role:'claimer', target: target});
	};
};
