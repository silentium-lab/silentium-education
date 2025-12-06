import { TemplateItem } from "@/modules/app/template/TemplateItem";
import { TemplateList } from "@/modules/app/template/TemplateList";
import { CategoryConfig } from "@/pages/Admin/Category/CategoryConfig";
import { $title, Tr } from "@/store";
import { partial } from "lodash-es";

export function CategoryList() {
  const $t = Tr("Categories");
  $title.chain($t);
  const $config = CategoryConfig();
  return TemplateList(
    $config,
    Tr("Create category"),
    partial(TemplateItem, $config),
  );
}
