import { Of, type EventType } from "silentium";
import { FromJson, Path } from "silentium-components";
import { CRUD } from "@/modules/app/CRUD";

export const settingsModels = {
  /**
   * Application is configured
   */
  hasSettings(): EventType<boolean> {
    return Path(
      FromJson(CRUD(Of("configured")).custom().result()),
      Of("data.configured"),
    );
  },
};
