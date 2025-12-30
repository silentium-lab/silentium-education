import { DocumentTitle } from "@/modules/DocumentTitle";
import { HistoryUrl } from "@/modules/HistoryUrl";
import { ContextTransport } from "@/transports/ContextTransport";
import { FetchAPITransport } from "@/transports/FetchAPITransport";
import { merge } from "lodash-es";
import {
  All,
  AppliedDestructured,
  ContextChain,
  ContextOf,
  DevTools,
  Late,
  Shared,
} from "silentium";

DevTools();

AppliedDestructured(
  All(ContextOf("request"), {
    params: {
      baseUrl: location.origin + ":4000",
    },
  }),
  merge,
).then(FetchAPITransport());

ContextOf("context").then(ContextTransport());

export const $notification = Late<{
  type: "error" | "success" | "info";
  content: string | object;
}>();

ContextOf("title").then(ContextChain(DocumentTitle()));
ContextOf("url").then(ContextChain(Shared(HistoryUrl())));
