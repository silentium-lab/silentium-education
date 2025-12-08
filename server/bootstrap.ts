import { merge } from "lodash-es";
import {
  All,
  Applied,
  AppliedDestructured,
  ContextChain,
  ContextOf,
  MessageType,
  Primitive,
  Shared,
} from "silentium";
import { CacheTransport } from "./transports/CacheTransport";
import { MongoTransport } from "./transports/MongoTransport";

(globalThis as any).debug = (name: string, ...messages: MessageType[]) => {
  Applied(All(...messages.map((e) => Shared(e))), (r) => ({
    name,
    ...r,
  })).then(console.table);
};
(globalThis as any).moment = ($message: MessageType) =>
  Primitive($message).primitive();

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
    rpID: "localhost",
    origin: "http://localhost:1234",
  }),
);
