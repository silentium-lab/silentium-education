import { ListPaginated } from "@/models/common/ListPaginated";
import { TemplateItem } from "@/modules/app/template/TemplateItem";
import { TemplateList } from "@/modules/app/template/TemplateList";
import { Mount } from "@/modules/render/Mount";
import { ArticleConfig } from "@/pages/Admin/Article/ArticleConfig";
import { ArticleFilter } from "@/pages/Admin/Article/ArticleFilter";
import { $title, Tr } from "@/store";
import { partial } from "lodash-es";
import { Applied, Catch, Chainable, Computed, Late } from "silentium";
import { Template } from "silentium-components";
import { Log } from "silentium-web-api";

export function ArticleList() {
  const $t = Tr("Articles");
  $title.chain($t);
  const $config = ArticleConfig();
  const $search = Late<any>();
  const { $template, $list } = TemplateList(
    $config,
    Tr("Create article"),
    $search,
    partial(TemplateItem, $config),
  );
  const list = ListPaginated(
    () => ({
      title: "",
    }),
    $list.then(Log("$list")),
  );
  $search.chain(list.$listFilter);
  Chainable(list.$error).chain(Catch($list));

  return Template(
    (t) => `
    <div>
      ${t.var(Mount(ArticleFilter(list.$filter, list.$search, list.$reset)))}
      ${t.var(Computed((v) => (v ? "Loading..." : ""), list.$loading))}
      ${t.var($template)}
      <hr class="mt-2 mb-2" />
      <div>
        ${t.var(Applied(list.$page, String))}
      </div>
    </div>
  `,
  );
}
