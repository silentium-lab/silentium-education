import { TemplateEdit } from "@/modules/app/template/TemplateEdit";
import { CategoryConfig } from "@/pages/Admin/Category/CategoryConfig";
import { CategoryForm } from "@/pages/Admin/Category/CategoryForm";
import { Tr } from "@/store";
import { Context } from "silentium";

export function CategoryEdit() {
  Context("title").chain(Tr("Category"));
  return TemplateEdit(CategoryConfig(), Tr("Categories"), CategoryForm);
}
