export function reversed<T>(items: T[]): T[] {
    const results = [...items];
    results.reverse();
    return results;
}