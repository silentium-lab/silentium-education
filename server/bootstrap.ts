import { All, AppliedDestructured, Of, RPCOf } from "silentium";
import { MongoTransport } from "./transports/MongoTransport";
import { merge } from "lodash-es";

AppliedDestructured(
  All(
    RPCOf("db"),
    Of({
      params: {
        dbName: "myapp",
      },
    }),
  ),
  merge,
).event(MongoTransport(process.env.MONGODB_URI ?? ""));
