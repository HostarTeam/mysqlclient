import { ConnectionOptions } from 'mysql2';
import { QueryRow, valueParam } from './typing/types';
export declare class MySQLClient {
    private config;
    private connection;
    constructor(config: ConnectionOptions);
    connect(): Promise<void>;
    getQueryResult(sql: string, values?: valueParam): Promise<QueryRow[]>;
    getFirstQueryResult(sql: string, values?: valueParam): Promise<QueryRow>;
    executeQuery(sql: string, values?: valueParam): Promise<void>;
}
export * from './typing/types';
