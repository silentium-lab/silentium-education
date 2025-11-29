import { CategoryConfig } from "@/pages/Admin/Category/CategoryConfig";
import { CategoryEdit } from "@/pages/Admin/Category/CategoryEdit";
import { CategoryList } from "@/pages/Admin/Category/CategoryList";
import { CategoryNew } from "@/pages/Admin/Category/CategoryNew";
import { NotFound } from "@/pages/NotFound";
import { $url } from "@/store";
import { Detached, Router } from "silentium-components";

export function CategoryRouter() {
  const $localUrl = Detached($url);
  const config = CategoryConfig();

  return Router(
    $localUrl,
    [
      {
        pattern: `^${config.path}$`,
        message: CategoryList,
      },
      {
        pattern: `^${config.path}/create$`,
        message: CategoryNew,
      },
      {
        pattern: String.raw`^${config.path}/.+/$`,
        message: CategoryEdit,
      },
    ],
    NotFound,
  );
}
