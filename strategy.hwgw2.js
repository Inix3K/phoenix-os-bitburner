/**
 * @typedef {import(".").NS} ns
 * @typedef {import("./phoenix-doc").PlayerObject} PlayerObject
 * @typedef {import("./phoenix-doc").ServerObject} ServerObject
 *
 */
import Default from "./strategy.base";

export default class hwgwww extends Default {
    constructor() {
        super();
        this.files = [
            {
                path: "bin.hk.futureloop.js",
                ram: 1.75,
                ratio: 0
            },
            {
                path: "bin.gr.futureloop.js",
                ram: 1.8,
                ratio: 0
            },
            {
                path: "bin.wk.futureloop.js",
                ram: 1.8,
                ratio: 0
            },
           
        ];
        this.stagger = 1;
    }

    disqualify_attacker(s) {
        return (s.ram.max < 8 || s.ram.free < 6);
    }

    prepare_bulk(attackers, player){

        let bundles = [];
        let pre_bundles = [];
        let unpromised_ram = new Map();
        let target = this.priorityQueue.poll();
        let spacing = attackers.length*2;

        attackers.forEach(a => unpromised_ram.set(a.id, a.ram.free));
        attackers.sort((a, b) => a.ram.free - b.ram.free); // sort low to high ram to fill weaken orders first

        while (target) {
            pre_bundles.push(calculate_hwgw_batch(target, player));
            target = this.priorityQueue.poll();
        }

        pre_bundles.sort((a, b) => b.growThreads - a.growThreads); // biggest targets first

        for (let bundle of pre_bundles) {
            let batch_time = 0;
            batch_time++;
            let target = bundle.target;
            let sumThreads = bundle.hackThreads + bundle.growThreads + bundle.weakThreads1 + bundle.weakThreads2;
            let suggested_bundles = [];
            for (let a of attackers) {
                let a_threads = {
                    w1: 0,
                    w2: 0,
                    g: 0,
                    h: 0
                };
                while (bundle.weakThreads1 > 0 && unpromised_ram.get(a.id) > 9) { // 5 weakens
                    bundle.weakThreads1 -= 5;
                    if (bundle.weakThreads1 < 0) {
                        a_threads.w1 += 5 - Math.abs(bundle.weakThreads1);
                        unpromised_ram.set(a.id, unpromised_ram.get(a.id) - (5 - Math.abs(bundle.weakThreads1) * bundle.weakFile.ram));
                        sumThreads -= 5 - Math.abs(bundle.weakThreads1);
                        bundle.weakThreads1 = 0;
                    } else {
                        a_threads.w1 += 5;
                        unpromised_ram.set(a.id, unpromised_ram.get(a.id) - 9); // we use static ram here; nice round numbers. we'll lose .5% of our threads against unready targets but whatever.
                        sumThreads -= 5;
                    }
                }

                while (bundle.weakThreads2 > 0 && unpromised_ram.get(a.id) > 9) { // 5 weakens
                    bundle.weakThreads2 -= 5;
                    if (bundle.weakThreads2 < 0) {
                        a_threads.w2 += 5 - Math.abs(bundle.weakThreads2);
                        unpromised_ram.set(a.id, unpromised_ram.get(a.id) - (5 - Math.abs(bundle.weakThreads2) * bundle.weakFile.ram));
                        sumThreads -= 5 - Math.abs(bundle.weakThreads2);
                        bundle.weakThreads2 = 0;
                    } else {
                        a_threads.w2 += 5;
                        unpromised_ram.set(a.id, unpromised_ram.get(a.id) - 9);
                        sumThreads -= 5;
                    }
                }

                if (a_threads.w1 > 0) {
                    suggested_bundles.push({
                        file: bundle.weakFile.path,
                        attacker: a.id,
                        threads: a_threads.w1,
                        args: [target.id, bundle.nextlaunchdate + spacing + (batch_time * 100)]
                    });
                }

                if (a_threads.w2 > 0) {
                    suggested_bundles.push({
                        file: bundle.weakFile.path,
                        attacker: a.id,
                        threads: a_threads.w2,
                        args: [target.id, bundle.nextlaunchdate + (spacing * 3) + (batch_time * 100)]
                    });
                }


                if (unpromised_ram.get(a.id) > bundle.growThreads * bundle.growFile.ram) {
                    a_threads.g = bundle.growThreads;
                    sumThreads -= bundle.growThreads;
                    unpromised_ram.set(a.id, unpromised_ram.get(a.id) - (bundle.growThreads * bundle.growFile.ram));
                    suggested_bundles.push({
                        file: bundle.growFile.path,
                        attacker: a.id,
                        threads: a_threads.g,
                        args: [target.id, bundle.nextlaunchdate + (spacing * 2) + (batch_time * 100)]
                    });
                    bundle.growThreads = 0;
                }

                if (unpromised_ram.get(a.id) > bundle.hackThreads * bundle.hackFile.ram) {
                    a_threads.h = bundle.hackThreads;
                    sumThreads -= bundle.hackThreads;
                    unpromised_ram.set(a.id, unpromised_ram.get(a.id) - (bundle.hackThreads * bundle.hackFile.ram));
                    suggested_bundles.push({
                        file: bundle.hackFile.path,
                        attacker: a.id,
                        threads: a_threads.h,
                        args: [target.id, bundle.nextlaunchdate]
                    });
                    bundle.hackThreads = 0;

                }
            }

            suggested_bundles = suggested_bundles.filter(b => b.threads >= 1);
            let sanity_check = (sumThreads == 0) &&
                (suggested_bundles.every(b => typeof b.attacker === "string")) &&
                (suggested_bundles.every(b => typeof b.args[0] === "string")) &&
                (suggested_bundles.every(b => b.args.length === 2));
                // workloads are launching with some targets getting just the WGW workload



            if (sanity_check) {

                // attackers.forEach(a => console.log("On the " + index + " iteration, " + a.id + " has " + unpromised_ram.get(a.id) + " ram remaining"));
                bundles.push(...suggested_bundles.map(b => JSON.stringify(b)));

            }
        }
        return bundles;
    }

    disqualify_target(t) {
        return (false);
    }

    filter_targets() {
        let priorities = new Map();
        priorities.set(0, (t => Math.ceil(t.money.available) == Math.ceil(t.money.max) && t.security.level == t.security.min));
        priorities.set(10, (t => t.hackTime < 3000));
        priorities.set(19, (t => t.money.available < t.money.max && t.security.level > t.security.min));
        priorities.set(18, (t => (t.id == "n00dles")));
        return priorities;
    }
    
    __package(bootstrapped, player) {
        return bootstrapped.map(a => this.prepare_bulk(bootstrapped, player));
    }

}

function calculate_hwgw_batch(target, player) {
    let hackFile = {
        path: "bin.hk.futureloop.js",
        ram: 1.75,
    };

    let growFile = {
        path: "bin.gr.futureloop.js",
        ram: 1.8,
    };

    let weakFile = {
        path: "bin.wk.futureloop.js",
        ram: 1.8,
    };
    
    var percentage_hacked = 0.40;
    var hackThreads;
    var growThreads;
    var weakThreads1;
    var weakThreads2;
    var sec1;
    var sec2;

    var hackTime = globalThis.ns.getHackTime(target.id);
    var growTime = hackTime * 3.2;
    var weakenTime = hackTime * 4;

    hackThreads = globalThis.ns.hackAnalyzeThreads(target.id, (target.money.max * percentage_hacked));
    growThreads = globalThis.ns.growthAnalyze(target.id, 1 / percentage_hacked);

    sec1 = hackThreads * 0.002;
    sec2 = growThreads * 0.004;
    weakThreads1 = sec1 / 0.05;
    weakThreads2 = sec2 / 0.05;

    if (target.money.max > target.money.available || target.security.level > target.security.min) {
        hackThreads = 0;
        growThreads = globalThis.ns.growthAnalyze(target.id, target.money.max+1 / target.money.available);
        weakThreads1 = (0.002 + target.security.level - target.security.min) / 0.05;
        weakThreads2 = growThreads * 0.004;
        // growFile = {
        //     path: "bin.gr.futureloop.js",
        //     ram: 1.8,
        // };
        // weakFile = {
        //     path: "bin.wk.futureloop.js",
        //     ram: 1.8,
        // };
    }

    let nextlaunchdate = new Date().valueOf() + Math.max(2000, weakenTime * 1.1);

    hackThreads  = Math.floor(hackThreads);
    growThreads  = Math.ceil(growThreads);
    weakThreads1 = Math.ceil(weakThreads1);
    weakThreads2 = Math.ceil(weakThreads2);

    return {
        hackTime,
        growTime,
        weakenTime,
        hackThreads,
        growThreads,
        weakThreads1,
        weakThreads2,
        hackFile,
        growFile,
        weakFile,
        nextlaunchdate,
        target
    };
}
