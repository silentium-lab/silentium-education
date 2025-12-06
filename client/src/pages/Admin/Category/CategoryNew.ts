import { TemplateNew } from "@/modules/app/template/TemplateNew";
import { CategoryConfig } from "@/pages/Admin/Category/CategoryConfig";
import { CategoryForm } from "@/pages/Admin/Category/CategoryForm";
import { $title, Tr } from "@/store";

export function CategoryNew() {
  $title.chain(Tr("Create category"));
  return TemplateNew(CategoryConfig(), Tr("Categories"), CategoryForm, {
    title: undefined,
    parent_id: undefined,
  });
}
