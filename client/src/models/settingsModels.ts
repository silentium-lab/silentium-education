import { CRUD } from "@/modules/app/CRUD";
import { MessageType, Of } from "silentium";
import { FromJson, Path } from "silentium-components";

export const settingsModels = {
  /**
   * Application is configured
   */
  hasSettings(): MessageType<boolean> {
    return Path(
      FromJson(CRUD(Of("configured")).custom().result()),
      Of("data.configured"),
    );
  },
};
