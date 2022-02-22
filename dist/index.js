import { createConnection, } from 'mysql2';
export class MySQLClient {
    constructor(config) {
        this.config = config;
        this.config = config;
    }
    connect() {
        return new Promise((resolve, reject) => {
            const connection = createConnection(this.config);
            connection.connect((err) => {
                if (err)
                    return reject(err);
                this.connection = connection;
                return resolve();
            });
        });
    }
    getQueryResult(sql, values = []) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, values, (err, rows) => {
                if (err)
                    return reject(err);
                else
                    return resolve(rows);
            });
        });
    }
    async getFirstQueryResult(sql, values = []) {
        const rows = await this.getQueryResult(sql, values);
        return rows[0] || null;
    }
    async executeQuery(sql, values = []) {
        await this.getQueryResult(sql, values);
    }
}
export * from './typing/types.js';
