import { CRUDCustom } from "@/modules/app/crud/CRUDCustom";
import { Of } from "silentium";
import { FromJson, Path } from "silentium-components";

export function SettingsConfigured() {
  return Path<boolean>(
    FromJson(CRUDCustom(Of("configured"))),
    "data.configured",
  );
}
