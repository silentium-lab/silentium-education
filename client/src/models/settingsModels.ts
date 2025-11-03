import { Applied, type EventType, Of, TransportType } from "silentium";
import { $backendCrud } from "../bootstrap";

export const settingsModels = {
  /**
   * Application is configured
   */
  hasSettings(transport: TransportType): EventType<boolean> {
    const settingsSrc = $backendCrud
      .ofModelName(Of("configured"))
      .custom<{ configured: boolean }>(transport);

    return Applied(settingsSrc, (s) => s.configured);
  },
};
