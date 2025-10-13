import { Db, MongoClient } from 'mongodb';
import { late } from 'silentium';

const url = process.env.MONGODB_URI ?? '';
const client = new MongoClient(url);

const dbName = 'myapp';
export const mongoTransport = (() => {
    const dbSrc = late<Db>();
    client.connect().then(() => {
        const db = client.db(dbName);
        dbSrc.use(db);
    });

    return dbSrc.event;
})
