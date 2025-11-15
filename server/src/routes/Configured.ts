import { Record } from "silentium-components";
import { settingsModels } from "../models/settingsModels";

/**
 * Is admin panel configured
 */
export function Configured() {
  return Record({
    data: Record({
      configured: settingsModels.isConfigured(),
    }),
  });
}
