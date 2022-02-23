import {
    Connection,
    ConnectionOptions,
    createConnection,
    RowDataPacket,
} from 'mysql2';
import { QueryRow, valueParam } from './typing/types';

export class MySQLClient {
    private connection: Connection | null | undefined;

    constructor(private config: ConnectionOptions) {
        this.config = config;
    }

    public connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            const connection: Connection = createConnection(this.config);
            connection.connect((err) => {
                if (err) return reject(err);

                this.connection = connection;
                return resolve();
            });
        });
    }

    public isConnected(): Promise<boolean> {
        if (!this.connection) return new Promise((resolve) => resolve(false));
        return new Promise((resolve) => {
            this.connection!.ping((err) => {
                if (err) return resolve(false);
                return resolve(true);
            });
        });
    }

    public getConnectionCallback(
        callback: (connection: Connection | null | undefined) => void
    ) {
        if (!this.connection) return callback(null);
        this.connection!.ping((err) => {
            if (err) return callback(null);
            return callback(this.connection);
        });
    }

    public getConnection(): Promise<Connection | null | undefined> {
        return new Promise((resolve) => {
            this.getConnectionCallback((connection) => {
                if (!connection) return resolve(null);
                return resolve(connection);
            });
        });
    }

    public isConnectedWithCallback(callback: (connected: boolean) => void) {
        this.getConnectionCallback((connection) => {
            return callback(!!connection);
        });
    }

    public isConnectedAsync(): Promise<boolean> {
        return new Promise((resolve) => {
            this.isConnectedWithCallback((connected) => {
                return resolve(connected);
            });
        });
    }

    public getQueryResult(
        sql: string,
        values: valueParam = []
    ): Promise<QueryRow[]> {
        if (!this.connection) throw new Error('Not connected to database');
        return new Promise((resolve, reject) => {
            this.getConnectionCallback((connection) => {
                if (!connection)
                    return reject(new Error('Not connected to database'));
            });

            this.connection!.query(
                sql,
                values,
                (err, rows: RowDataPacket[]) => {
                    if (err) return reject(err);
                    else return resolve(rows);
                }
            );
        });
    }

    public async getFirstQueryResult(
        sql: string,
        values: valueParam = []
    ): Promise<QueryRow> {
        const rows = await this.getQueryResult(sql, values);
        return rows[0] || null;
    }

    public async executeQuery(
        sql: string,
        values: valueParam = []
    ): Promise<void> {
        await this.getQueryResult(sql, values);
    }
}

export * from './typing/types.js';
