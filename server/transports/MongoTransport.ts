import { merge, omit } from "lodash-es";
import { MongoClient } from "mongodb";
import { ContextType } from "silentium";

/**
 * method - method from collection
 * params.dbName - name of database
 * params.collection - name of collection
 * params.args - args to method
 */
export function MongoTransport(url: string) {
  const client = new MongoClient(url);

  return (context: ContextType) => {
    const dbName = context.params?.dbName ?? "silentium";
    client
      .connect()
      .then(async () => {
        try {
          const db = client.db(dbName);
          const collection = db.collection(
            context.params?.collection ?? "unknown",
          );
          const args = context.params?.args ?? [];
          const argsObject = merge({}, ...args);
          const total = await collection.countDocuments(argsObject);
          const method = context.params?.method;
          let result = await (collection as any)[method](...args);
          const postProcess = context.params?.postProcess;
          if (postProcess) {
            const postProcessArgs = context.params?.postProcessArgs ?? [];
            if (Array.isArray(postProcess)) {
              await Promise.all(
                await postProcess.map(async (p) => {
                  result = await result[p[0]](...(p.slice(1) ?? []));
                }),
              );
            } else {
              result = await result[postProcess](...postProcessArgs);
            }
          }
          context.result?.({
            data: Array.isArray(result)
              ? result.map((item: object) => omit(item, ["data"]))
              : omit(result, ["data"]),
            meta: { total, time: Date.now() },
          });
        } catch (e) {
          context.error?.(e);
          console.log("mongo error: ", url, JSON.stringify(e));
        }
      })
      .catch((e) => {
        context.error?.(e.message);
        console.log("mongo connect", url, e);
      });
  };
}
