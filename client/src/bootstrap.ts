import { DocumentTitle } from "@/modules/DocumentTitle";
import { HistoryUrl } from "@/modules/HistoryUrl";
import { StorageRecord } from "@/modules/plugins/storage/StorageRecord";
import { ContextTransport } from "@/transports/ContextTransport";
import { FetchAPITransport } from "@/transports/FetchAPITransport";
import { merge } from "lodash-es";
import {
  All,
  Destructured,
  ContextChain,
  ContextOf,
  DevTools,
  Late,
  Of,
  Shared,
} from "silentium";
import translations from "@/data/translations.json";

DevTools();

Destructured(
  All(ContextOf("request"), {
    params: {
      baseUrl:
        process.env.NODE_ENV === "development"
          ? "http://localhost:4000"
          : location.origin,
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
ContextOf("lang").then(ContextChain(Shared(StorageRecord(Of("lang"), "ru"))));
ContextOf("translations").then(ContextChain(Of(translations)));
