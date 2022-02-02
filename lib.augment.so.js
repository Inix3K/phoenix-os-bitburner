// import { handleDB } from "./lib.database.so";
import { faction_edges } from "./var.constants";
import { Graph, GraphVertex, GraphEdge, dijkstra, PriorityQueue } from "./lib.structures.so";


export function augFactory(name) {
    let AugmentObject = Object.create({});
    Object.defineProperty(AugmentObject, name, { value: name, enumerable: true});

    Object.defineProperties(AugmentObject, {
        name: {
            value: name,
            enumerable: true
        },
        price: {
            get: (function () { return globalThis.ns.getAugmentationPrice(name);})
        },
        rep: {
            get: (function () { return globalThis.ns.getAugmentationRepReq(name);})
        },
        stats: {
            get: (function () { return globalThis.ns.getAugmentationStats(name);})
        },
        prereq: {
            get: (function() { return globalThis.ns.getAugmentationPrereq(name);})
        },
        owned: {
            get: (function() { return globalThis.ns.getOwnedAugmentations(true).includes(name); })
        },
        installed: {
            get: (function() { return globalThis.ns.getOwnedAugmentations(false).includes(name); })
        },
    });

    Object.defineProperties(AugmentObject, {
        faction_graph: {
            get: (function() {
                let graph = new Graph(true);
                let root = new GraphVertex("root");
                graph.addVertex(root);
                // generate a list of all factions who have aug
                for (let [fname, {type, req}] of faction_edges) {
                    if (globalThis.ns.getAugmentationsFromFaction(fname).includes(AugmentObject.name) && !AugmentObject.owned) {
                        let f = new GraphVertex(fname);
                        // add to graph as vertices
                        graph.addVertex(f);
                        graph.addEdge(new GraphEdge(root, f, req + AugmentObject.rep));
                        // use rep reqs as edge weights
                    }
                }

                try { // try-catches arent ideal because nodes will be missing if they dont have our augment, but those nodes should exist and have value.
                graph.addEdge(new GraphEdge(
                    graph.getVertexByKey("CyberSec"), graph.getVertexByKey("NiteSec"), 150
                ));
                } catch (e) {}
        
                try {
                graph.addEdge(new GraphEdge(
                   graph.getVertexByKey("NiteSec"), graph.getVertexByKey("The Black Hand"), 130
                ));
                } catch (e) {}
        
                try {
                graph.addEdge(new GraphEdge(
                    graph.getVertexByKey("The Black Hand"), graph.getVertexByKey("BitRunners"), 200
                ));
                } catch (e) {}

                try {
                graph.addEdge(new GraphEdge(
                    graph.getVertexByKey("Slum Snakes"), graph.getVertexByKey("Tetrads"), 9
                ));
                } catch (e) {}
        
                try {
                graph.addEdge(new GraphEdge(
                    graph.getVertexByKey("Tetrads"), graph.getVertexByKey("Speakers for the Dead"), 30
                ));
                } catch (e) {}
                
                try {
                graph.addEdge(new GraphEdge(
                    graph.getVertexByKey("Tetrads"), graph.getVertexByKey("The Dark Army"), 40
                ));
                } catch (e) {}
        
                try {
                graph.addEdge(new GraphEdge(
                    graph.getVertexByKey("Speakers for the Dead"), graph.getVertexByKey("The Syndicate"), 25000
                ));
                } catch (e) {}
                try {
                graph.addEdge(new GraphEdge(
                    graph.getVertexByKey("The Dark Army"), graph.getVertexByKey("The Covenant"), 200000
                ));
                } catch (e) {}

                let {distances, previousVertices} = dijkstra(graph, root);
                return distances;
            })},

        // nearest: {
        //     get: (function () {
        //         const { distances, previousVertices } = AugmentObject.faction_graph;
        //         const pq = new PriorityQueue();
        //         for (let [k,v] of distances) {
        //             pq.add(k,v);
        //         }

        //         let closest_faction = null;
        //         let next = pq.poll();
        //         while (!closest_faction && next) {

        //             console.log(pq.poll());
        //         }

        //         return pq;
        //     })
        // }
    });


    // AugmentObject.refreshCache = async function() {
    //         const db = await handleDB();
    //         const repr = {
    //             name: AugmentObject.name,
    //             price: AugmentObject.price,
    //             rep: AugmentObject.rep,
    //             stats: AugmentObject.stats,
    //             prereq: AugmentObject.prereq,
    //             owned:  AugmentObject.owned,
    //             installed: AugmentObject.installed,
    //             acquisition: AugmentObject.faction_graph,
    //         };
    //         await db.put("augmentations", repr);
    //     };

    AugmentObject.purchase = (ns, player) => {
        if ((player.money >= AugmentObject.price) && 
        (this.prereq.length == 0 || ns.getOwnedAugmentations(false).includes(AugmentObject.name))) {
            for (let faction of player.factions.membership) {
                try {
                    if (ns.getAugmentationsFromFaction(faction).includes(AugmentObject.name)) {
                        return ns.purchaseAugmentation(faction, AugmentObject.name);
                    }
                } catch(e) { }
            }
        }
    };

    return AugmentObject;

}




// export class Augmentation {
//     constructor(name) {
//         this.name = name;
//     }

//     get price() { return globalThis.ns.getAugmentationPrice(this.name);}
//     get rep() { return globalThis.ns.getAugmentationRepReq(this.name);}
//     get stats() { return globalThis.ns.getAugmentationStats(this.name);}
//     get prereq() { return globalThis.ns.getAugmentationPrereq(this.name);}
//     get owned() { return globalThis.ns.getOwnedAugmentations(true).includes(this.name); }
//     get installed() { return globalThis.ns.getOwnedAugmentations(false).includes(this.name); }
    
//     wipe() { return globalThis.ns.installAugmentations("tucson.js");} 

//     faction_graph() {
//         let graph = new Graph(true);
//         let root = new GraphVertex("root");
//         graph.addVertex(root);
//         // generate a list of all factions who have aug
//         faction_edges.forEach(function (v,k,m) {
//             if (globalThis.ns.getAugmentationsFromFaction(k).includes(this.name) && this.owned == false) {
//                 let f = new GraphVertex(k);
//                 // add to graph as vertices
//                 graph.addVertex(f);
//                 graph.addEdge(new GraphEdge(root, f, v.req + this.rep));
//                 // use rep reqs as edge weights
//             }
//         });

//         graph.addEdge(new GraphEdge(
//             graph.getVertexByKey("CyberSec"), graph.getVertexByKey("NiteSec"), 150
//         ));

//         graph.addEdge(new GraphEdge(
//            graph.getVertexByKey("NiteSec"), graph.getVertexByKey("The Black Hand"), 130
//         ));

//         graph.addEdge(new GraphEdge(
//             graph.getVertexByKey("The Black Hand"), graph.getVertexByKey("BitRunners"), 200
//         ));

//         graph.addEdge(new GraphEdge(
//             graph.getVertexByKey("Slum Snakes"), graph.getVertexByKey("Tetrads"), 9
//         ));
//         graph.addEdge(new GraphEdge(
//             graph.getVertexByKey("Tetrads"), graph.getVertexByKey("Speakers for the Dead"), 30
//         ));
//         graph.addEdge(new GraphEdge(
//             graph.getVertexByKey("Tetrads"), graph.getVertexByKey("The Dark Army"), 40
//         ));

//         graph.addEdge(new GraphEdge(
//             graph.getVertexByKey("Speakers for the Dead"), graph.getVertexByKey("The Syndicate"), 25000
//         ));
//         graph.addEdge(new GraphEdge(
//             graph.getVertexByKey("The Dark Army"), graph.getVertexByKey("The Covenant"), 200000
//         ));
        


//         let {distances, previousVertices} = dijkstra(graph, root);
//         return distances;
//     }

//     get_nearest() {
//         const { distances, previousVertices } = faction_graph();
//         const pq = new PriorityQueue();
//         for (let [k,v] of distances) {
//             pq.add(k,v);
//         }

//         return pq;
//     }

//     purchase(ns, player) {
//         if ((player.money >= this.price) && 
//         (this.prereq.length == 0 || ns.getOwnedAugmentations(false).includes(this.name))) {
//             for (let faction of player.factions.membership) {
//                 try {
//                     if (ns.getAugmentationsFromFaction(faction).includes(this.name)) {
//                         return ns.purchaseAugmentation(faction, this.name);
//                     }
//                 } catch(e) { }
//             }
//         }
//     }

//     async cached(force=false) {
//         const db = await handleDB();
//         let aug;
        
//         if (force) {
//             return augmentFactory(aug_name);
//         }

//         try {
//             aug = await db.get("augmentations", aug_name);
//         } catch (e) { aug = augmentFactory(aug_name); }
        
//         return aug;
//     }

//     async refreshCache() {
//         const db = await handleDB();
//         let repr = {
//             price: this.price,
//             rep: this.rep,
//             stats: this.stats,
//             prereq: this.prereq,
//             owned: this.owned,
//             installed: this.installed,
//             acquisition: this.faction_graph,
//         };
//     }
// }

