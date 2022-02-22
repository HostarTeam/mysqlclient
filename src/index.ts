import {
    Connection,
    ConnectionOptions,
    createConnection,
    RowDataPacket,
} from 'mysql2';
import { QueryRow, valueParam } from './typing/types';

export class MySQLClient {
    private connection!: Connection;

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

    public getQueryResult(
        sql: string,
        values: valueParam = []
    ): Promise<QueryRow[]> {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, values, (err, rows: RowDataPacket[]) => {
                if (err) return reject(err);
                else return resolve(rows);
            });
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

export * from './typing/types';