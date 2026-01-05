import { TemplateNew } from "@/modules/app/template/TemplateNew";
import { Tr } from "@/modules/I18n";
import { CategoryConfig } from "@/pages/Admin/Category/CategoryConfig";
import { CategoryForm } from "@/pages/Admin/Category/CategoryForm";
import { Context } from "silentium";

export function CategoryNew() {
  Context("title").chain(Tr("Create category"));
  return TemplateNew(CategoryConfig(), Tr("Categories"), CategoryForm, {
    title: undefined,
    parent_id: undefined,
    section_id: undefined,
    code: undefined,
    published: undefined,
  });
}
