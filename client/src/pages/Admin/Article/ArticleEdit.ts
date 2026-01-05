import { TranslatedForm } from "@/components/common/TranslatedForm";
import { TemplateEdit } from "@/modules/app/template/TemplateEdit";
import { Tr } from "@/modules/I18n";
import { ArticleConfig } from "@/pages/Admin/Article/ArticleConfig";
import { ArticleForm } from "@/pages/Admin/Article/ArticleForm";
import { partial } from "lodash-es";
import { Context } from "silentium";

export function ArticleEdit() {
  Context("title").chain(Tr("Article"));
  return TemplateEdit(
    ArticleConfig(),
    Tr("Articles"),
    partial(TranslatedForm, ArticleForm),
  );
}
