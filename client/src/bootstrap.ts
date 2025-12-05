import { ContextTransport } from "@/transports/ContextTransport";
import { FetchAPITransport } from "@/transports/FetchAPITransport";
import { merge } from "lodash-es";
import { All, AppliedDestructured, ContextOf, Late } from "silentium";

AppliedDestructured(
  All(ContextOf("request"), {
    params: {
      baseUrl: "http://localhost:4000",
    },
  }),
  merge,
).then(FetchAPITransport());

ContextOf("context").then(ContextTransport());

export const $notification = Late<{
  type: "error" | "success" | "info";
  content: string | object;
}>();
