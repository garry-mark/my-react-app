export default (str: string) => {
    if (/^[a-z]+(?:[A-Z][a-z]*)*$/.test(str)) {
        return str.replace(/[A-Z]/, (m: string) => `_${m.toLowerCase()}`);
    } else {
        throw new Error('string must be camel-case.');
    }
}