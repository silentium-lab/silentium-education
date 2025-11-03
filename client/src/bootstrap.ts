import {
  Applied,
  EventType,
  LateShared,
  Of,
  RPC,
  RPCType,
  Shared,
  Transport,
  TransportEvent,
  TransportType,
} from "silentium";
import { settingsModels } from "./models/settingsModels";
import { CrudModels } from "./modules/app/CrudModels";
import { $error } from "./store";
import { FetchedData } from "silentium-web-api";

const $abort = LateShared();

// TODO move to web api
const requestTransport = Transport<RPCType>((r) => {
  console.log("r", r);

  const abortController = new AbortController();
  if (r.params?.abort) {
    r.params.abort.event(
      Transport((abort) => {
        if (abort) {
          abortController.abort();
        }
      }),
    );
  }
  const { baseUrl, url, method, credentials, headers, body, query } =
    r.params ?? {};
  let urlWithQuery: URL;
  try {
    urlWithQuery = new URL(
      String(url ?? "/test"),
      baseUrl ?? "http://localhost:4000",
    );
  } catch {
    r.error?.use(new Error("Invalid URL"));
    return;
  }
  Object.entries(query ?? {}).forEach(([key, value]) =>
    urlWithQuery.searchParams.append(key, String(value)),
  );
  const options: RequestInit = {
    method: method ?? "post",
    credentials,
    headers,
    body: (body ? JSON.stringify(body) : undefined) as BodyInit,
    signal: abortController.signal,
  };
  fetch(urlWithQuery.toString(), options)
    .then((response) => response.text())
    .then((data) => r.result?.use(data))
    .catch((error) => {
      r.error?.use(error);
    });
});

RPC.transport.request = requestTransport;

export const backendTransport = TransportEvent<any, any>((config) => {
  return FetchedData(
    Applied(
      config as EventType<Record<string, unknown>>,
      (r: Record<string, unknown>) => {
        return {
          baseUrl: "http://localhost:4000",
          headers: {
            "Content-Type": "application/json",
          },
          ...r,
        };
      },
    ),
    $error,
    $abort,
  );
}) as unknown as TransportType;

export const $backendCrud = CrudModels(Of("data"));
export const $notification = LateShared<{
  type: "error" | "success" | "info";
  content: string;
}>();

export const $hasSettings = Shared(
  settingsModels.hasSettings(backendTransport),
);
