import { TemplateNew } from "@/modules/app/template/TemplateNew";
import { CategoryConfig } from "@/pages/Admin/Category/CategoryConfig";
import { CategoryForm } from "@/pages/Admin/Category/CategoryForm";
import { $title, i18n } from "@/store";

export function CategoryNew() {
  const $label = i18n.tr("Create category");
  $title.chain($label);
  return TemplateNew(CategoryConfig(), $label, CategoryForm);
}
