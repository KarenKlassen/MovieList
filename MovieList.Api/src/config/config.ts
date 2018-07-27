export interface IMovieDB {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: string;
}

export interface IEnvironmentSettings {
    baseRouterPath: string;
    port: number;
    baseURL: string;
    applicationURL: string;
    movieDB: IMovieDB;
}

export interface ISettings {
    [key: string]: IEnvironmentSettings;
}

export interface IConfig {
    settings: ISettings;
}