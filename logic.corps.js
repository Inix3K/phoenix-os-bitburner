export const init = async (ns, player, servers) => {
    return { player, servers };
};

export const hackModifiers = async (ns, player, servers, weights) => {
    return new Map();
};

export const moneyModifiers = async (ns, player, servers, weights) => {
    return new Map();
};