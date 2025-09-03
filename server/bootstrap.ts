import { MongoClient } from 'mongodb';
import { Late, Lazy, Of } from 'silentium';

const url = process.env.MONGODB_URI ?? '';
const client = new MongoClient(url);

const dbName = 'myapp';
export const mongoTransport = new Lazy(() => {
    const dbSrc = new Late();
    client.connect().then(() => {
        const db = client.db(dbName);
        dbSrc.give(db);
    });

    return dbSrc;
})
