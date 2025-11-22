import { merge } from "lodash-es";
import {
  All,
  AppliedDestructured,
  ContextChain,
  ContextOf,
  Of,
} from "silentium";
import { CacheTransport } from "./transports/CacheTransport";
import { MongoTransport } from "./transports/MongoTransport";

AppliedDestructured(
  All(
    ContextOf("db"),
    Of({
      params: {
        dbName: "myapp",
      },
    }),
  ),
  merge,
).then(MongoTransport(process.env.MONGODB_URI ?? ""));

ContextOf("cache").then(CacheTransport());

ContextOf("config").then(
  ContextChain({
    rpName: "TestApp",
    rpID: "localhost",
    origin: "http://localhost:1234",
  }),
);
