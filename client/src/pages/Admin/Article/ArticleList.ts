import { TemplateItem } from "@/modules/app/template/TemplateItem";
import { TemplateList } from "@/modules/app/template/TemplateList";
import { ArticleConfig } from "@/pages/Admin/Article/ArticleConfig";
import { $title, Tr } from "@/store";
import { partial } from "lodash-es";

export function ArticleList() {
  const $t = Tr("Articles");
  $title.chain($t);
  const $config = ArticleConfig();
  return TemplateList(
    $config,
    Tr("Create article"),
    partial(TemplateItem, $config),
  );
}
