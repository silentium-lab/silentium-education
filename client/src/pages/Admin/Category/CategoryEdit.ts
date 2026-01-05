import { TranslatedForm } from "@/components/common/TranslatedForm";
import { TemplateEdit } from "@/modules/app/template/TemplateEdit";
import { Tr } from "@/modules/I18n";
import { CategoryConfig } from "@/pages/Admin/Category/CategoryConfig";
import { CategoryForm } from "@/pages/Admin/Category/CategoryForm";
import { partial } from "lodash-es";
import { Context } from "silentium";

export function CategoryEdit() {
  Context("title").chain(Tr("Category"));
  return TemplateEdit(
    CategoryConfig(),
    Tr("Categories"),
    partial(TranslatedForm, CategoryForm),
  );
}
