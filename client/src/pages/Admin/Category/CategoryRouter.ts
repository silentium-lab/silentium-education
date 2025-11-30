import { TemplateRouter } from "@/modules/app/template/TemplateRouter";
import { CategoryConfig } from "@/pages/Admin/Category/CategoryConfig";
import { CategoryEdit } from "@/pages/Admin/Category/CategoryEdit";
import { CategoryList } from "@/pages/Admin/Category/CategoryList";
import { CategoryNew } from "@/pages/Admin/Category/CategoryNew";

export function CategoryRouter() {
  return TemplateRouter(
    CategoryConfig(),
    CategoryList,
    CategoryNew,
    CategoryEdit,
  );
}
