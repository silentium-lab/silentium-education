import { ListPaginated } from "@/models/common/ListPaginated";
import { TemplateItem } from "@/modules/app/template/TemplateItem";
import { TemplateList } from "@/modules/app/template/TemplateList";
import { ArticleConfig } from "@/pages/Admin/Article/ArticleConfig";
import { ArticleFilter } from "@/pages/Admin/Article/ArticleFilter";
import { $title, Tr } from "@/store";
import { partial } from "lodash-es";
import { Catch, Chainable, Late } from "silentium";
import { Template } from "silentium-components";

export function ArticleList() {
  const $t = Tr("Articles");
  $title.chain($t);
  const $config = ArticleConfig();
  const $search = Late<any>({});
  const { $template, $list } = TemplateList(
    $config,
    Tr("Create article"),
    $search,
    partial(TemplateItem, $config),
  );
  const list = ListPaginated(
    () => ({
      title: undefined,
    }),
    $list,
  );
  $search.chain(list.$listFilter);
  Chainable(list.$error).chain(Catch($list));

  return Template(
    (t) => `
    <div>
      ${t.var(ArticleFilter(list.$filter, list.$search, list.$reset))}
      ${t.var($template)}
    </div>
  `,
  );
}
