import { Of, type EventType } from "silentium";
import { FromJson, Path } from "silentium-components";
import { CRUD } from "@/modules/app/CRUD";

export const settingsModels = {
  /**
   * Application is configured
   */
  hasSettings(): EventType<boolean> {
    const $settings = FromJson(CRUD(Of("configured")).custom().result());

    return Path($settings, Of("data.configured"));
  },
};
