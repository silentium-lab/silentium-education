import { TemplateEdit } from "@/modules/app/template/TemplateEdit";
import { CategoryConfig } from "@/pages/Admin/Category/CategoryConfig";
import { CategoryForm } from "@/pages/Admin/Category/CategoryForm";
import { $title, Tr } from "@/store";

export function CategoryEdit() {
  $title.chain(Tr("Category"));
  return TemplateEdit(CategoryConfig(), Tr("Categories"), CategoryForm);
}
