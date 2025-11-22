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
    const dbName = context.params?.dbName ?? "app";
    client
      .connect()
      .then(async () => {
        try {
          const db = client.db(dbName);
          const collection = db.collection(
            context.params?.collection ?? "unknown",
          );
          const args = context.params?.args ?? [];
          const method = context.params?.method;
          let result = await (collection as any)[method](...args);
          const postProcess = context.params?.postProcess;
          if (postProcess) {
            const postProcessArgs = context.params?.postProcessArgs ?? [];
            result = await result[postProcess](...postProcessArgs);
          }
          context.result?.(result);
        } catch (e) {
          context.error?.(e);
        }
      })
      .catch((e) => {
        context.error?.(e.message);
      });
  };
}
