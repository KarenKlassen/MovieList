declare module '*.json' {
    const value: any;
    export default value;
}

interface Error {
    status?: number;
}