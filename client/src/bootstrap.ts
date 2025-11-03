import {
  Applied,
  EventType,
  LateShared,
  Of,
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
