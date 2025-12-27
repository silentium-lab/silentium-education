import { TemplateNew } from "@/modules/app/template/TemplateNew";
import { CategoryConfig } from "@/pages/Admin/Category/CategoryConfig";
import { CategoryForm } from "@/pages/Admin/Category/CategoryForm";
import { Tr } from "@/store";
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
