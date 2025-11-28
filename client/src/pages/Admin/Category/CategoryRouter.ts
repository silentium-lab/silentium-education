import { CategoryEdit } from "@/pages/Admin/Category/CategoryEdit";
import { CategoryList } from "@/pages/Admin/Category/CategoryList";
import { CategoryNew } from "@/pages/Admin/Category/CategoryNew";
import { NotFound } from "@/pages/NotFound";
import { $url } from "@/store";
import { Detached, Router } from "silentium-components";

export function CategoryRouter() {
  const $localUrl = Detached($url);

  return Router(
    $localUrl,
    [
      {
        pattern: "^/admin/categories$",
        message: CategoryList,
      },
      {
        pattern: "^/admin/categories/create$",
        message: CategoryNew,
      },
      {
        pattern: String.raw`^/admin/categories/.+/$`,
        message: CategoryEdit,
      },
    ],
    NotFound,
  );
}
