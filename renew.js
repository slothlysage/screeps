/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('renew');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    check : function () {
        if (Game.spawns.Spawn1.isActive())
            var heal = Game.spawns.Spawn1.pos.closestByPath(FIND_MY_CREEPS, {
                filter: (c) => c.memory.health == "danger"
            })
            if (heal != undefined) {

            }
    },
    full : function(creep) {
        if (creep.memory.health != "high") {
            if (creep.ticksToLive < 250 && Game.spawns.Spawn1.renewCreep(creep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns.Spawn1);
            }
            else {
                creep.memory.health = "high";
            }
        }
    },
    half : function(creep) {
        if (creep.memory.health != "high" || creep.memory.health != "low") {
            if (creep.ticksToLive < 150 && Game.spawns.Spawn1.renewCreep(creep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns.Spawn1);
            }
            else {
                creep.memory.health = "low";
            }
        }
    }
};