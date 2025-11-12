import { merge } from "lodash-es";
import { All, AppliedDestructured, Of, RPCChain, RPCOf } from "silentium";
import { MongoTransport } from "./transports/MongoTransport";
import { CacheTransport } from "./transports/CacheTransport";

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

RPCOf("cache").event(CacheTransport());

RPCOf("config").event(
  RPCChain(
    Of({
      rpName: "TestApp",
      rpID: "localhost",
      origin: "http://localhost:1234",
    }),
  ),
);
