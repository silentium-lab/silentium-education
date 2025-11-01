import {
  Applied,
  EventType,
  LateShared,
  Of,
  Shared,
  TransportEvent,
  TransportType,
} from "silentium";
import { settingsModels } from "./models/settingsModels";
import { CrudModels } from "./modules/app/CrudModels";
import { errorSrc } from "./store";
import { FetchedData } from "silentium-web-api";

export const backendTransport = TransportEvent<any, any>(([r, e, a]) =>
  FetchedData(
    Applied(
      r as EventType<Record<string, unknown>>,
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
    (e as TransportType) ?? errorSrc,
    a as EventType,
  ),
) as unknown as TransportType;

export const backendCrudSrc = CrudModels(Of("data"));
export const notificationSrc = LateShared<{
  type: "error" | "success" | "info";
  content: string;
}>();

export const hasSettingsSrc = Shared(
  settingsModels.hasSettings(backendTransport),
);
