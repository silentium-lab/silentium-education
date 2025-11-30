import { TemplateEdit } from "@/modules/app/template/TemplateEdit";
import { CategoryConfig } from "@/pages/Admin/Category/CategoryConfig";
import { CategoryForm } from "@/pages/Admin/Category/CategoryForm";
import { $title, i18n } from "@/store";

export function CategoryEdit() {
  $title.chain(i18n.tr("Category"));
  return TemplateEdit(CategoryConfig(), i18n.tr("Category"), CategoryForm);
}
