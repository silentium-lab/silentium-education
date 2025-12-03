import { TemplateNew } from "@/modules/app/template/TemplateNew";
import { ArticleConfig } from "@/pages/Admin/Article/ArticleConfig";
import { ArticleForm } from "@/pages/Admin/Article/ArticleForm";
import { $title, i18n } from "@/store";

export function ArticleNew() {
  const $label = i18n.tr("Create article");
  $title.chain($label);
  return TemplateNew(ArticleConfig(), $label, ArticleForm, {
    title: undefined,
    content: undefined,
    category_id: undefined,
    section_id: undefined,
  });
}
