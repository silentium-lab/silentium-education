import { TemplateNew } from "@/modules/app/template/TemplateNew";
import { Tr } from "@/modules/I18n";
import { ArticleConfig } from "@/pages/Admin/Article/ArticleConfig";
import { ArticleForm } from "@/pages/Admin/Article/ArticleForm";
import { Context } from "silentium";

export function ArticleNew() {
  Context("title").chain(Tr("Create article"));
  return TemplateNew(ArticleConfig(), Tr("Articles"), ArticleForm, {
    order: undefined,
    title: undefined,
    description: undefined,
    content: undefined,
    category_id: undefined,
    section_id: undefined,
    code: undefined,
    published: false,
  });
}
