import { Db } from "mongodb";
import { From, Lazy, OwnerType, TheInformation } from "silentium";

export interface ArticleType {
    title: string;
    content: string;
    published: Date;
}

export class ArticleList extends TheInformation<ArticleType[]> {
    constructor(private articleTransport: Lazy<Db>) {
        super(articleTransport);
    }

    value(o: OwnerType<ArticleType[]>): this {
        const t = this.articleTransport.get();
        t.value(new From(async (db) => {
            const collection = db.collection('documents');
            const result = await collection.insertOne({
                title: 'one',
                content: 'two'
            })
            o.give([result.insertedId] as any);
        }));
        return this;
    }
}
