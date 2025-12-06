import { TemplateEdit } from "@/modules/app/template/TemplateEdit";
import { ArticleConfig } from "@/pages/Admin/Article/ArticleConfig";
import { ArticleForm } from "@/pages/Admin/Article/ArticleForm";
import { $title, Tr } from "@/store";

export function ArticleEdit() {
  $title.chain(Tr("Article"));
  return TemplateEdit(ArticleConfig(), Tr("Articles"), ArticleForm);
}
