import { EventType, Of } from "silentium";
import { RecordOf } from "silentium-components";
import { settingsModels } from "../models/settingsModels";

/**
 * Is admin panel configured
 */
export function Configured(): EventType {
  return RecordOf({
    headers: Of({
      test: "123321",
    }),
    data: RecordOf({
      configured: settingsModels.isConfigured(),
    }),
  });
}
