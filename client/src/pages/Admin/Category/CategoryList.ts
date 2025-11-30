import { TemplateItem } from "@/modules/app/template/TemplateItem";
import { TemplateList } from "@/modules/app/template/TemplateList";
import { CategoryConfig } from "@/pages/Admin/Category/CategoryConfig";
import { $title, i18n } from "@/store";
import { partial } from "lodash-es";

export function CategoryList() {
  const $t = i18n.tr("Categories");
  $title.chain($t);
  const $config = CategoryConfig();
  return TemplateList(
    $config,
    i18n.tr("Create category"),
    partial(TemplateItem, $config),
  );
}
