/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('work');
 * mod.thing == 'a thing'; // true
 */
var harvester = require('harvester');
var upgrader = require('upgrader');
var builder = require('builder');
var repairer = require('repairer');

module.exports = {
	run: function() {
		for (let name in Game.creeps) {
			var creep = Game.creeps[name];
			if (creep.memory.role == 'harvester') {
				harvester.run(creep);
			}
			else if (creep.memory.role == 'upgrader') {
				upgrader.run(creep);
			}
			else if (creep.memory.role == 'builder') {
				builder.run(creep);
			}
			else if (creep.memory.role == 'repairer') {
				repairer.run(creep);
			}
		}
	}
};
