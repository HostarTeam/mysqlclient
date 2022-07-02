import { ConnectionOptions } from 'mysql2/typings/mysql';

export type valueParam = string | number | Array<string | number>;
export interface QueryRow {
    [key: string]: string | number | bigint | null;
}

export interface ExtendedConnectionOptions extends ConnectionOptions {
    assureConnected?: boolean;
    maxRetries?: number;
}
