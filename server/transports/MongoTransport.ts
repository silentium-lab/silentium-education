import { MongoClient } from "mongodb";
import { RPCType, Tap } from "silentium";

/**
 * method - method from collection
 * params.dbName - name of database
 * params.collection - name of collection
 * params.args - args to method
 */
export function MongoTransport(url: string) {
  const client = new MongoClient(url);

  return Tap<RPCType>((rpc) => {
    const dbName = rpc.params?.dbName ?? "app";
    client
      .connect()
      .then(async () => {
        try {
          const db = client.db(dbName);
          const collection = db.collection(rpc.params?.collection ?? "unknown");
          const args = rpc.params?.args ?? [];
          const method = rpc.method;
          let result = await (collection as any)[method](...args);
          const postProcess = rpc.params?.postProcess;
          if (postProcess) {
            const postProcessArgs = rpc.params?.postProcessArgs ?? [];
            result = await result[postProcess](...postProcessArgs);
          }
          rpc.result?.use(result);
        } catch (e) {
          rpc.error?.use(e);
        }
      })
      .catch((e) => {
        rpc.error?.use(e.message);
      });
  });
}
