import { BlogLatest } from "@/components/widgets/BlogLatest";
import { Record } from "silentium-components";

/**
 * Map of available widgets what can be used inside
 * article contents
 */
export function Widgets() {
  return Record({
    "[blog]": BlogLatest(),
  });
}
