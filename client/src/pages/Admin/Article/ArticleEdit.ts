import { TemplateEdit } from "@/modules/app/template/TemplateEdit";
import { ArticleConfig } from "@/pages/Admin/Article/ArticleConfig";
import { ArticleForm } from "@/pages/Admin/Article/ArticleForm";
import { $title, i18n } from "@/store";

export function ArticleEdit() {
  $title.chain(i18n.tr("Article"));
  return TemplateEdit(ArticleConfig(), i18n.tr("Article"), ArticleForm);
}
