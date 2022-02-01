import * as aj from "./challenge.array_jumping";
import * as lpf from "./challenge.find_lpf";
import * as fvme from "./challenge.find_valid_math";
import * as genip from "./challenge.generate_ip";
import * as mergeo from "./challenge.merge_overlapping";
import * as minpathtri from "./challenge.min_path_sum_triangle";
import * as sani from "./challenge.sanitize_parenthesis";
import * as spiral from "./challenge.spiralize_matrix";
import * as st1 from "./challenge.stock_trader_1";
import * as st2 from "./challenge.stock_trader_2";
import * as st3 from "./challenge.stock_trader_3";
import * as st4 from "./challenge.stock_trader_4";
import * as subarr from "./challenge.subarray_max_sum";
import * as twts from "./challenge.total_ways_sum";
import * as upg1 from "./challenge.unique_paths_grid_1";
import * as upg2 from "./challenge.unique_paths_grid_2";

export const attemptContract = (type, data) => {

    switch (type) {
        case "Spiralize Matrix": 
            return spiral.answer(data);
            
        case "Subarray with Maximum Sum":
            return subarr.answer(data);
            
        case "Algorithmic Stock Trader I":
            return st1.answer(data);
            
        case "Algorithmic Stock Trader II":
            return st2.answer(data);
            
        case "Algorithmic Stock Trader III":
            return st3.answer(data);
            
        case "Algorithmic Stock Trader IV":
            return st4.answer(data);
            
        case "Unique Paths in a Grid I":
            return upg1.answer(data);
            
        case "Unique Paths in a Grid II":
            return upg2.answer(data);
            
        case "Minimum Path Sum in a Triangle":
            return minpathtri.answer(data);
            
        case "Array Jumping Game":
            return aj.answer(data);
            
        case "Find Largest Prime Factor":
            return lpf.answer(data);
            
        case "Total Ways to Sum":
            return twts.answer(data);
            
        case "Find All Valid Math Expressions":
            return fvme.answer(data);
            
        case "Generate IP Addresses":
            return genip.answer(data);
            
        case "Merge Overlapping Intervals":
            return mergeo.answer(data);
            
        case "Sanitize Parentheses in Expression":
            return sani.answer(data);
            
        default:
            console.log("Unrecognized coding contract type.");
            return null;
    }
};

export const init = (ns, player, servers) => {
    return { player, servers };
};
