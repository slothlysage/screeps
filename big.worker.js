/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('big.worker');
 * mod.thing == 'a thing'; // true
 */

module.exports = function () {
	StructureSpawn.prototype.createBigWorker = 
		function (energy, roleName) {
		var numParts = Math.floor(energy / 200);
		var body = [];
		for (let i = 0; i < numParts; i++) {
			body.push(WORK);
			body.push(CARRY);
		}
		for (let i = 0; i < numParts; i++) {
			body.push(MOVE);
		}
		return this.createCreep(body, undefined, { role: roleName, working: false });
};
