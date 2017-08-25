modules.export = {
    total : function (minimum) {
        var total = []
        for (let role in minimum) {
            total[role] = _.sum(Game.creeps, (c) => c.memory.role == role);
        }
    }
}