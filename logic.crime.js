class Crime {
    constructor(name) {
        this.name = name;
    }

    async cache() {}
    get chance() { return globalThis.ns.getCrimeChance(this.name);}
    get stats() { return globalThis.ns.getCrimeStats(this.name);}

}



export const init = async (ns, player, servers) => {
    return { player, servers };
};

export const hackModifiers = async (ns, player, servers, weights) => {
    return new Map();
};

export const moneyModifiers = async (ns, player, servers, weights) => {
    return new Map();
};

export const loop = async (ns, player, servers) => {
    return { player, servers };
};