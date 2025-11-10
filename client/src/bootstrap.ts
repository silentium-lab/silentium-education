import { FetchAPITransport } from "@/transports/FetchAPITransport";
import { merge } from "lodash-es";
import { All, AppliedDestructured, LateShared, Of, RPCOf } from "silentium";

// Handle HTTP requests
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
).event(FetchAPITransport());

export const $notification = LateShared<{
  type: "error" | "success" | "info";
  content: string;
}>();
