module.exports = {
    total : function (minimum) {
        var total = []
        for (let role in minimum) {
            total[role] = _.sum(Game.creeps, (c) => c.memory.role == role.substring(0, role.length - 1));
        }
    },
	autoRoads: function(creep) {
		creep.pos.createConstructionSite(STRUCTURE_ROAD);
	},
	scavange: function(creep) {
		var pickup = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
		if (pickup && creep.pickup(pickup) == ERR_NOT_IN_RANGE) {
			creep.moveTo(source);
		}
	},
}
