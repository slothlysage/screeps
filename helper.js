modules.exports = {
    total : function (minimum) {
        var total = []
        for (let role in minimum) {
            total[role] = _.sum(Game.creeps, (c) => c.memory.role == role.substring(0, role.length - 1));
        }
    }
}