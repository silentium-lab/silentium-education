import { CRUD } from "@/modules/app/CRUD";
import { Of, type EventType } from "silentium";
import { Path } from "silentium-components";

export const settingsModels = {
  /**
   * Application is configured
   */
  hasSettings(): EventType<boolean> {
    const $settings = CRUD(Of("configured")).custom<{
      configured: boolean;
    }>();

    return Path($settings.result(), Of("configured"));
  },
};
