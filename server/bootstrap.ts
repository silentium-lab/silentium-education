import { Applied, RPCOf } from "silentium";
import { MongoTransport } from "./transports/MongoTransport";

Applied(RPCOf("db"), (rpc) => ({
  ...rpc,
  params: {
    dbName: "myapp",
    ...rpc.params,
  },
})).event(MongoTransport(process.env.MONGODB_URI ?? ""));
