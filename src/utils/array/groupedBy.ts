import { sortedBy } from "./sortedBy";

export function groupedBy<T, K>(array: T[], keyFunc: (item: T) => K): [K, T[]][] {
    const result: [K, T[]][] = [];
    
    for (const item of sortedBy(array, keyFunc)) {
        const key = keyFunc(item);
        if(result.length === 0) {
            result.push([key, [item]]);
        } else {
            const [lastKey, lastItems] = result[result.length - 1];
            if (lastKey === key) {
                lastItems.push(item);
            } else {
                result.push([key, [item]]);
            }
        }
    }
    
    return result;
}