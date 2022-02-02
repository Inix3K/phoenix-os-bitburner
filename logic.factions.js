/**
 * @typedef {(*.*).NS} ns
 */

// import { handleDB } from "./lib.database.so";

import { faction_blockers } from "./var.constants";
import { Faction } from "./lib.factions.so";
import { augFactory } from "./lib.augment.so";
import { MinHeap } from "./lib.structures.so";

export const init = async (ns, player, servers) => {
    let factions = [];
    let aug_list = [];
    let aug_map = new Map();
    let aug_pq = [];

    ns.tprint("Initializing factions...");
    faction_blockers.forEach(function (v,k) {
        factions.push(new Faction(k));
    });

    for (let faction of factions) {
        // const db = await handleDB();
        // let snap = JSON.parse(JSON.stringify(faction));
        // await db.put("factions", snap);
        aug_list.push(...faction.augmentations_available());
    }

    ns.tprint("Initializing augmentations...");
    for (let aug_name of aug_list) {
        let aug = augFactory(aug_name);
        aug_map.set(aug_name, aug);
    }

    for (let [aug_name, aug_obj] of aug_map) {
        // dijkstra's shortest path pq
        // contains a list of factions that own this augment and
        // the "distance" to acquiring it
        // let { distances, previousVertices } = aug_obj.faction_graph;
        // let heap = new MinHeap((a,b) => a[0]-b[0]);
        // if (distances) {
        //     for (let distance of distances) {
        //         heap.add(distance);
        //     }
        // }
        // aug_pq.push(heap);
    }



    return { player, servers, factions,  aug_map};
};

export const hackModifiers = async (ns, player, servers, weights) => {
    return new Map();
};


export const moneyModifiers = async (ns, player, servers, weights) => {
    let new_weights = new Map();

    // if (await owned_aug_count() >= 30) {
    //     new_weights.set("ENDGAME", Number.NEGATIVE_INFINITY);
    // }
    return new_weights;
};

export const loop = async (ns, player, servers, factions, aug_map) => {
        if (ns.checkFactionInvitations().length > 0) {
        for (let faction of ns.checkFactionInvitations()) {
            ns.joinFaction(faction);
        }
        stopAction();
        ns.workForFaction(player.faction.membership[player.faction.length-1], "Hacking Contracts", true);
    //join factions without any restrictions
	// await joinFactions(ns, player);

	// set best activity
	// await selectFocusActivity(ns, player);

    }

    just_buy_anything(ns, player, factions, aug_map);

    return { player, servers, factions, aug_map};
};

export function just_buy_anything(ns, player, factions, aug_map){
    for (let faction of factions) {
        let augs = faction.augmentations_available();
        for (let aug of augs) {
            if (aug) {
                ns.tprint(aug);
                let aug_obj = aug_map.get(aug);
                if (player.money >= aug.price && faction.rep > aug.rep && (aug.prereq.length == 0 || ns.getOwnedAugmentations(true).includes(aug.prereq))) {
                    faction.purchaseAug(aug);
                    ns.tprint("purchasing aug");
                }
            }
            
        }
    }
    if (ns.getOwnedAugmentations(true) - ns.getOwnedAugmentations(false >=2)) {
        stopAction();
        player.installAugs();
    }
}