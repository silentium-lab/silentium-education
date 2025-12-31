import { merge } from "lodash-es";
import {
  All,
  AppliedDestructured,
  ContextChain,
  ContextOf,
  DevTools,
} from "silentium";
import { CacheTransport } from "./transports/CacheTransport";
import { MongoTransport } from "./transports/MongoTransport";

DevTools();

AppliedDestructured(
  All(ContextOf("db"), {
    params: {
      dbName: "myapp",
    },
  }),
  merge,
).then(MongoTransport(process.env.MONGODB_URI ?? ""));

ContextOf("cache").then(CacheTransport());

ContextOf("config").then(
  ContextChain({
    rpName: "TestApp",
    rpID: process.env.NODE_ENV === "development" ? "localhost" : "silentium.pw",
    origin: "http://localhost:1234",
  }),
);
