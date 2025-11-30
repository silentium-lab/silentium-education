import { TemplateItem } from "@/modules/app/template/TemplateItem";
import { TemplateList } from "@/modules/app/template/TemplateList";
import { ArticleConfig } from "@/pages/Admin/Article/ArticleConfig";
import { $title, i18n } from "@/store";
import { partial } from "lodash-es";

export function ArticleList() {
  const $t = i18n.tr("Articles");
  $title.chain($t);
  const $config = ArticleConfig();
  return TemplateList(
    $config,
    i18n.tr("Create article"),
    partial(TemplateItem, $config),
  );
}
