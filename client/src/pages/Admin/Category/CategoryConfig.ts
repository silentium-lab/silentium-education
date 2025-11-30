import { Of } from "silentium";

export function CategoryConfig() {
  return Of({
    model: "private/categories",
    path: "/admin/categories",
  });
}
