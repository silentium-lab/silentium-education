import { TemplateEdit } from "@/modules/app/template/TemplateEdit";
import { ArticleConfig } from "@/pages/Admin/Article/ArticleConfig";
import { ArticleForm } from "@/pages/Admin/Article/ArticleForm";
import { Tr } from "@/store";
import { Context } from "silentium";

export function ArticleEdit() {
  Context("title").chain(Tr("Article"));
  return TemplateEdit(ArticleConfig(), Tr("Articles"), ArticleForm);
}
