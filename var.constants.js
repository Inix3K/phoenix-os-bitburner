export const reservedHomeRam = 64;
export const loop_time = 12000;

const HackSemaphores = {};

export const strategy_semaphores = HackSemaphores;

export const faction_blockers = new Map([
    ["Sector-12", ["Chongqing", "New Tokyo", "Ishima", "Volhaven"]],
    ["Chongqing", ["Sector-12", "Aevum", "Volhaven"]],
    ["New Tokyo", ["Sector-12", "Aevum", "Volhaven"]],
    ["Ishima", ["Sector-12", "Aevum", "Volhaven"]],
    ["Aevum", ["Chongqing", "New Tokyo", "Ishima", "Volhaven"]],
    ["Volhaven", ["Chongqing", "New Tokyo", "Ishima", "Sector-12", "Aevum"]],
    ["NiteSec", []],
    ["CyberSec", []],
    ["Tian Di Hui", []],
    ["Netburners", []],
    ["BitRunners", []],
    ["ECorp", []],
    ["The Black Hand", []],
    ["KuaiGong International", []],
    ["MegaCorp", []],
    ["NWO", []],
    ["Four Sigma", []],
    ["OmniTek Incorporated", []],
    ["Blade Industries", []],
    ["Clarke Incorporated", []],
    ["Bachman & Associates", []],
    ["Slum Snakes", []],
    ["Fulcrum Secret Technologies", []],
    ["Silhouette", []],
    ["Tetrads", []],
    ["The Dark Army", []],
    ["Speakers for the Dead", []],
    ["The Covenant", []],
    ["The Syndicate", []],
    ["Illuminati", []],
    ["Daedalus", []]
]);

export const faction_edges = new Map([
    ["Sector-12", {type: "faction", req: 0}],
    ["Chongqing", {type: "faction", req: 0}],
    ["New Tokyo", {type: "faction", req: 0}],
    ["Ishima", {type: "faction", req: 0}],
    ["Aevum", {type: "faction", req: 0}],
    ["Volhaven", {type: "faction", req: 0}],
    ["NiteSec", {type: "faction", req: 220}],
    ["CyberSec", {type: "faction", req: 70}],
    ["Tian Di Hui", {type: "faction", req: 0}],
    ["Netburners", {type: "faction", req: 220}],
    ["BitRunners", {type: "faction", req: 550}],
    ["ECorp", {type: "company", req: 200000}],
    ["The Black Hand", {type: "faction", req: 350}],
    ["KuaiGong International", {type: "company", req: 200000}],
    ["MegaCorp", {type: "company", req: 200000}],
    ["NWO", {type: "company", req: 200000}],
    ["Four Sigma", {type: "company", req: 200000}],
    ["OmniTek Incorporated", {type: "company", req: 200000}],
    ["Blade Industries", {type: "company", req: 200000}],
    ["Clarke Incorporated", {type: "company", req: 200000}],
    ["Bachman & Associates", {type: "company", req: 200000}],
    ["Slum Snakes", {type: "gang", req: 9}],
    ["Fulcrum Secret Technologies", {type: "company", req: 250000}],
    ["Silhouette", {type: "gang", req: 200000}],
    ["Tetrads", {type: "gang", req: 18}],
    ["The Dark Army", {type: "gang", req: 45}],
    ["Speakers for the Dead", {type: "gang", req: 45}],
    ["The Covenant", {type: "gang", req: 250000}],
    ["The Syndicate", {type: "gang", req: 50000}],
    ["Illuminati", {type: "gang", req: 450000}],
    ["Daedalus", {type: "gang", req: 250000}]
]);



























