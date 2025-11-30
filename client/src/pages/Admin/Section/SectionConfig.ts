import { Of } from "silentium";

export function SectionConfig() {
  return Of({
    model: "private/sections",
    path: "/admin/sections",
  });
}
