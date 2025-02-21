export function bigIntReplacer(_key: any, value: any) {
    return typeof value === 'bigint' ? value.toString() : value;
}