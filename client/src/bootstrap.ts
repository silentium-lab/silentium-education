import { ContextTransport } from "@/transports/ContextTransport";
import { FetchAPITransport } from "@/transports/FetchAPITransport";
import { merge } from "lodash-es";
import { All, AppliedDestructured, LateShared, Of, RPCOf } from "silentium";

AppliedDestructured(
  All(
    RPCOf("request"),
    Of({
      params: {
        baseUrl: "http://localhost:4000",
      },
    }),
  ),
  merge,
).pipe(FetchAPITransport());

RPCOf("context").pipe(ContextTransport());

export const $notification = LateShared<{
  type: "error" | "success" | "info";
  content: string;
}>();
