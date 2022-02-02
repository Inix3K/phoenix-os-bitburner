

export function PlayerExtender(player) {
    Object.defineProperties(player, {
        isBusy: {
            get: (function () { return globalThis.ns.isBusy();})
        },
        homeRAMcost: {
            get: (function () { return globalThis.ns.getUpgradeHomeRamCost();})
        },
        homeCPUcost: {
            get: (function () { return globalThis.ns.getUpgradeHomeCoresCost();})
        }
    });

    player.createProgram = function (program) {
        return globalThis.ns.createProgram(program, true);
    };

    player.upgradeRAM = function () {
        return globalThis.ns.upgradeHomeRam();
    };

    player.upgradeCores = function () {
        return globalThis.ns. upgradeHomeCores();
    };

    player.travel = function (city) {
        return globalThis.ns.travelToCity(city);
    };

    player.relocate = function(location) {
        return globalThis.ns.goToLocation(location);
    };

    player.heal = function() {
        return globalThis.ns.hospitalize();
    };

    player.purchaseProgram = function(name) {
        if (!this.software.tor) {
            globalThis.ns.purchaseTor();
        }
        return globalThis.ns.purchaseProgram(name);
    };

    player.stopAction = function() {
        return globalThis.ns.stopAction();
    };

    player.softReset = function() {
        return globalThis.ns.softReset('tucson.js');
    };

    player.installAugs = function () {
        return globalThis.ns.installAugmentations("tucson.js");
    };

    return player;
}

export const getFocusStat = async (ns, player) => {
    const aug_count = await owned_aug_count();
    // priority queue will resolve highest value as priority
    let weights = new Map();
    // hacking_money_mult selected as "default" if everything else is <=0
    // this stat is found across factions throughout the entire game progression,
    // and it has the most direct correlation to growth. however, a bunch of augments
    // have this as one of several multipliers
    weights.set("hacking_money_mult", 1);

    // hacking_mult will most-increase our progression at higher levels of the game.
    // critical for achieving daedalus progression, but not particularly necessary
    // in the lower levels, as ports define your attack potential, not level.
    
    weights.set("hacking_mult", player.level - (Math.pow(aug_count,2.4) - Math.pow(aug_count,1.2))); 
    // don't see any reason to target this
    weights.set("hacking_chance_mult",0);
    // we'll just base these off (home ram * cores) since they're multiplicative
    weights.set("hacking_speed_mult");
    weights.set("hacking_grow_mult", 0);
    // no idea
    weights.set("strength_mult", 0);
    weights.set("defense_mult", 0);
    weights.set("dexterity_mult", 0);
    weights.set("agility_mult", 0);
    weights.set("charisma_mult", 0);
    weights.set("strength_exp", 0);
    weights.set("defense_exp", 0);
    weights.set("dexterity_exp", 0);
    weights.set("agility_exp", 0);
    weights.set("charisma_exp", 0);

    // progression oriented; best for early game
    weights.set("company_rep_mult",(500 / (Math.log(1.035) * aug_count)));
    weights.set("faction_rep_mult",(500 / (Math.log(1.008) * aug_count)));
    weights.set("work_money_mult",0); // not a priority except on certain bitnodes

    // v-shaped value across the entire gamestate; good at the start because there's
    // more opportunity; good at the end because it makes for cheap augs.
    weights.set("hacknet_node_money_mult", ((1 / (Math.log(aug_count) / Math.log(Math.E)))) * 700);
    weights.set("hacknet_node_purchase_cost_mult", ((1 / (Math.log(aug_count) / Math.log(Math.E)))) * 700);
    weights.set("hacknet_node_ram_cost_mult", ((1 / (Math.log(aug_count) / Math.log(Math.E)))) * 700);
    weights.set("hacknet_node_core_cost_mult", ((1 / (Math.log(aug_count) / Math.log(Math.E)))) * 700);
    weights.set("hacknet_node_level_cost_mult", ((1 / (Math.log(aug_count) / Math.log(Math.E)))) * 700);

    const pq = queueFactory(weights, true);
    return [pq.poll(),pq.poll(),pq.poll()];
};

class Gym {
    constructor(name) {
        this.name = name;
    }

    workout(stat) { return globalThis.ns.gymWorkout(this.name, stat, true);}
    study(courseName) { return globalthis.ns.universityCourse(this.name, courseName, true);}

}
