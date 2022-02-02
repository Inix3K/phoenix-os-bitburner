import { PlayerExtender } from "./lib.singularity.so";
import { getAllServers } from "./lib.serverextras.so";

/**
 * @typedef {import(".").NS} ns
 * @typedef {import("./phoenix-doc").PlayerObject} PlayerObject
 * @typedef {import("./phoenix-doc").ServerObject} ServerObject
 *
 */


/**
 * 
 * @param {ns} ns 
 * @param {PlayerObject} player 
 * @param {ServerObject[]} servers 
 */

 export const init = async (ns, player, servers) => {
	player = PlayerExtender(player);
		
    return { player, servers };
};


export const loop = async (ns, player, servers) => {

	/*****************
	Get software
	*****************/
	if (player.ports < 5) {

		let software_list = [
			"BruteSSH.exe",
			"FTPCrack.exe",
			"relaySMTP.exe",
			"HTTPWorm.exe",
			"SQLInject.exe"
		];
	
		for (let software of software_list) {
			try {
				player.purchaseProgram(software);
			} catch (e) {}
		}
	}

	try {
		player.upgradeRAM();
	} catch (e) {}

	try {
		let factions = ["CSEC", "avmnite-02h", "I.I.I.I", "run4theh111z", "w0r1d_d43m0n"];
		for (let s of servers.filter(s => factions.includes(s.hostname) && s.admin && !s.backdoored && s.level <= player.level)) {
			let route = getAllServers(ns, s.id, true);
			let first_stop = route.shift(); //pop home off
			if (first_stop != "home") {
				route.unshift(first_stop);
			}

			for (let link of route) {
				ns.connect(link);
			}
			await ns.installBackdoor();
			ns.connect("home");
		}
	} catch (e) {}

	return { player, servers };
};



export const hackModifiers = async (ns, player, servers, weights) => {
    return new Map();
};

export const moneyModifiers = async (ns, player, servers, weights) => {
    return new Map();
};