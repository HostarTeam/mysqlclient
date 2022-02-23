"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLClient = void 0;
const mysql2_1 = require("mysql2");
class MySQLClient {
    config;
    connection;
    constructor(config) {
        this.config = config;
        this.config = config;
    }
    connect() {
        return new Promise((resolve, reject) => {
            const connection = (0, mysql2_1.createConnection)(this.config);
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
exports.MySQLClient = MySQLClient;
__exportStar(require("./typing/types.js"), exports);
