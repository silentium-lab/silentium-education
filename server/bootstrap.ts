import { merge } from "lodash-es";
import {
  All,
  Destructured,
  ContextChain,
  ContextOf,
  DevTools,
} from "silentium";
import { CacheTransport } from "./transports/CacheTransport";
import { MongoTransport } from "./transports/MongoTransport";

DevTools();

Destructured(
  All(ContextOf("db"), {
    params: {
      dbName: "myapp",
    },
  }),
  merge,
).then(MongoTransport(process.env.MONGODB_URI ?? ""));

ContextOf("trackable").then((v) => {
  if (v?.params?.action === "value") {
    console.log("trackable: ", JSON.stringify(v));
  }
});

ContextOf("cache").then(CacheTransport());

ContextOf("config").then(
  ContextChain({
    rpName: "TestApp",
    rpID: process.env.NODE_ENV === "development" ? "localhost" : "silentium.pw",
    origin: "http://localhost:1234",
  }),
);
