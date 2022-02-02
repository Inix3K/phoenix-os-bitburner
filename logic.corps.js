class Company {
    constructor(name) {
        this.name = name;
    }

    async cache() {}

    apply(field) { return globalThis.ns.applyToCompany(this.name, field);}
    get favor() { return globalThis.ns.getCompanyFavor(this.name);}
    get favorGain() { return globalThis.ns.getCompanyFavorGain(this.name);}
    get favorRep() { return globalThis.ns.getCompanyRep(this.name);}
    work() { return globalThis.ns.workForCompany(this.name, true);}
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