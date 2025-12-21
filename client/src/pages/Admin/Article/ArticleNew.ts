import { TemplateNew } from "@/modules/app/template/TemplateNew";
import { ArticleConfig } from "@/pages/Admin/Article/ArticleConfig";
import { ArticleForm } from "@/pages/Admin/Article/ArticleForm";
import { $title, Tr } from "@/store";

export function ArticleNew() {
  $title.chain(Tr("Create article"));
  return TemplateNew(ArticleConfig(), Tr("Articles"), ArticleForm, {
    title: undefined,
    content: undefined,
    category_id: undefined,
    section_id: undefined,
    code: undefined,
    published: false,
  });
}
