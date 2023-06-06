export function sortedBy<T, K>(array: T[], keyFunc: (item: T) => K): T[] {
  return [...array].sort((a, b) => {
    const keyA = keyFunc(a)
    const keyB = keyFunc(b)
    if (keyA < keyB) return -1
    if (keyA > keyB) return 1
    return 0
  })
}