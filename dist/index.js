var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createConnection, } from 'mysql2';
class MySQLClient {
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
    getFirstQueryResult(sql, values = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield this.getQueryResult(sql, values);
            return rows[0] || null;
        });
    }
    executeQuery(sql, values = []) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getQueryResult(sql, values);
        });
    }
}
export default MySQLClient;
