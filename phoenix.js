/**
 * @typedef {import(".").NS} ns
 * @typedef {import("./phoenix-doc").PlayerObject} PlayerObject
 * @typedef {import("./phoenix-doc").ServerObject} ServerObject
 *
 */

import * as motd from "./etc.motd";
import updateData, { firstLoad } from "./lib.loader.so";

/***************************************************************/
/*                     RAM USAGE CONTROL                       */
/* In this section, we define a bunch of "fake" files.         */
/* Using the "fake" imports allows operation on systems with   */
/* lower specifications, albeit at reduced functionality.      */
/***************************************************************/

/***************************************************************/
/*                  SINGULARITY FUNCTIONS                      */
import * as sing from "./logic.singularity";
/*                  SINGULARITY FAKES                          */
// import * as sing from "./fake.singularity";
/***************************************************************/

/***************************************************************/
/*                  FACTION FUNCTIONS                          */
import * as facts from "./logic.factions";
/*                  FACTION FAKES                              */
// import * as facts from "./fake.factions";
/***************************************************************/

/***************************************************************/
/*                  CORPORATION FUNCTIONS                      */
// import * as corps from "./logic.corps";
/*                  CORPORATION FAKES                          */
import * as corps from "./fake.corps";
/***************************************************************/

/***************************************************************/
/*                  CRIME FUNCTIONS                            */
// import * as crimes from "./logic.crimes";
/*                  CRIME FAKES                                */
import * as crimes from "./fake.crimes";
/***************************************************************/

/***************************************************************/
/*                  CODING CONTRACT FUNCTIONS                  */
import * as leetcode from "./logic.leetcode";
/*                  CODING CONTRACT FAKES                      */
// import * as leetcode from "./fake.leetcode";
/***************************************************************/

/***************************************************************/
/*                  SLEEVE FUNCTIONS                           */
// import * as sleeves from "./logic.sleeve";
/*                  SLEEVE FAKES                               */
import * as sleeves from "./fake.sleeve";
/***************************************************************/

/***************************************************************/
/*                   <MERGE PLACEHOLDER>                       */
/***************************************************************/

/***************************************************************/
/*                  </MERGE PLACEHOLDER>                       */
/***************************************************************/

/***************************************************************/
/*                  USER OVERLOADS                             */
/* I strongly suggest you move these files to a new location.  */
/* You'll probably want to update this software in the future  */
/* without losing all your customizations.                     */

import { determineResourceAllocation } from "./logic.money";
import { determineHackStrategy } from "./logic.hack";
import { loop_time } from "./var.constants";
// import { handleDB } from "./lib.database.so";

// import { determineResourceAllocation } from "./home.logicMoney";
// import { determineGameStage } from "./home.logicHacking";

/***************************************************************/
/* Note: you can overload other parts of this script (except)  */
/* the main loop in a similar manner. Just adjust the imports  */
/* to point to your new location.                              */
/*                                                             */
/* To prevent filename conflicts, this script will never       */
/* prefix a module with "home." or "/home" or any derivative.  */
/***************************************************************/
 
export async function main(ns){
    globalThis.ns = ns;
    motd.banner(ns);
    let start_time = new Date();
    let {servers, player} = firstLoad(ns);

    // kill all non-phoenix files on boot
    servers.map(server => server.pids).flat()
        .filter(process => process.filename != "phoenix.js" && process.filename != "sbin.keepalive.js")
        .forEach(process => ns.kill(process.pid));


    let factions;
    let aug_map;
    ({player, servers, factions, aug_map}     = await facts.init               (ns, player, servers));
    // ({player, servers}     = await corps.init               (ns, player, servers));
    // ({player, servers}     = await crimes.init              (ns, player, servers));
    ({player, servers}     = await leetcode.init            (ns, player, servers));
    // ({player, servers}     = await sleeves.init             (ns, player, servers));
    ({player, servers}     = await sing.init                (ns, player, servers));

        
    while (true) {
        await heartbeat(ns, player, servers);
        
        ({servers, player} = updateData(ns, servers, player));

        // dev note: snapshotting is new functionality. if it throws an error, you can safely comment it out.
        // when this data becomes used for something, i'll remove this note. please file a bug report if you have
        // any issues, as theoretically, database access is browser-dependent.
        // let ssp = await snapshotPlayer(player);
        // const db = await handleDB();
        // await db.put("player", ssp);

        // for await (const server of servers) {
        //     let sss = await snapshotServer(server);
        //     const db = await handleDB();
        //     await db.put("servers", sss);
        // }

        // await ns.wget(`http://localhost:8000/report/bn4/player/${new Date().valueOf()}/${JSON.stringify(snapshotPlayer)}/`, "nothing.txt");
        // await ns.wget(`http://localhost:8000/report/bn4/server/${new Date().valueOf()}/${JSON.stringify(snapshotServer)}/`, "nothing.txt");
        
        var hackStrategy = await determineHackStrategy(ns, servers, player);
        var moneyStrategy = await determineResourceAllocation(ns, servers, player);

        ({player, servers, factions, aug_map}     = await facts.loop               (ns, player, servers, factions, aug_map));
        // ({player, servers}     = await corps.loop               (ns, player, servers));
        // ({player, servers}     = await crimes.loop              (ns, player, servers));
        // ({player, servers}           = leetcode.loop            (ns, player, servers));
        // ({player, servers}     = await sleeves.loop             (ns, player, servers));
        ({player, servers}     = await sing.loop               (ns, player, servers));

        ({player, servers}     = await moneyStrategy.init       (ns, player, servers));
        ({player, servers}           = moneyStrategy.buy_things (ns, player, servers));
        ({player, servers}     = await hackStrategy.init        (ns, player, servers));
        ({player, servers}           = hackStrategy.do_hack     (ns, player, servers));

        await ns.sleep(loop_time);
        ({player, servers}     = await moneyStrategy.cleanup    (ns, player, servers));
        ({player, servers}     = await hackStrategy.cleanup     (ns, player, servers));
        // ({player, servers}     = await sing.omega            (ns, player, servers));

        if (hackStrategy != player.hackStrategy) {
            try {
                ({ player, servers} = await player.hackStrategy.sighup(ns, player, servers));
            } catch (e) {}
        }
        player.hackStrategy = hackStrategy;
        
        if (moneyStrategy != player.moneyStrategy) {
            try {
                ({ player, servers } = await player.moneyStrategy.sighup(ns, player, servers));
            } catch (e) {}
        }

        console.log(moneyStrategy);
        player.moneyStrategy = moneyStrategy;
        
        await motd.banner_short(ns, player, servers, hackStrategy, moneyStrategy, start_time);
    }
}

async function heartbeat(ns, player, servers) {
    if (servers.some(s => s.hostname == "home" && s.ram.trueMax >= 32)) {
        ns.clearPort(20);
        await ns.writePort(20, new Date().valueOf());
        if (ns.ps("home").filter(process => process.filename == "sbin.keepalive.js").length != 1) {
            ns.exec("sbin.keepalive.js","home");
            ns.print("keepalive not found, restarting");
        }
    } else {
        ns.print("Not enough RAM to start keepalive daemon on home.");
    }
}