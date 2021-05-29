export async function TimeOutAsync(fn: () => any, millisecond: number) {
    return new Promise(async r => {
        setTimeout(() => r(null),millisecond);
        let main = await fn();
        r(main)
    });
}