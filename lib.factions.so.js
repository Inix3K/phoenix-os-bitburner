
/**
 *
 *
 * @export
 * @class Faction
 */
export class Faction {
    constructor(name) {
        this.name = name;
    }

    async cache() {}

    donate(amount) { return ns.donateToFaction(this.name, amount);}
    invited() { return globalThis.ns.checkFactionInvites().includes(this.name);}
    get favor() { return globalThis.ns.getFactionFavor(this.name);}
    get favorGain() { return globalThis.ns.getFactionFavorGain(this.name);}
    get rep() { return globalThis.ns.getFactionRep(this.name);}
    join() { return globalThis.ns.joinFaction(this.name);}
    purchaseAug(aug_name) { return globalThis.ns.purchaseAugmentation(this.name, aug_name);}
    work(type="Hacking Contracts") { return globalThis.ns.workForFaction(this.name, type, true);}
    /** @return {Augmentation[]} */
    augmentations_available() {
        // return globalThis.ns.getAugmentationsFromFaction(this.name).filter(s => !globalThis.ns.getOwnedAugmentations(true).includes(s));
        return globalThis.ns.getAugmentationsFromFaction(this.name);
    }
}

const invites = () => { return globalThis.ns.checkFactionInvites(); };