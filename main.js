var roleHarvester = require('harvester');
var roleUpgrader = require('upgrader');

module.exports.loop = function () {
    
    for(let name in Game.creeps) {
        var creep = Game.creeps[name];
        roleHarvester.run(creep);
    }
}