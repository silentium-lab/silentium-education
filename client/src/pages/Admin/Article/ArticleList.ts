import { Button } from "@/components/Button";
import { ListPaginated } from "@/models/common/ListPaginated";
import { TemplateItem } from "@/modules/app/template/TemplateItem";
import { TemplateList } from "@/modules/app/template/TemplateList";
import { ArticleConfig } from "@/pages/Admin/Article/ArticleConfig";
import { ArticleFilter } from "@/pages/Admin/Article/ArticleFilter";
import { $title, Tr } from "@/store";
import { partial } from "lodash-es";
import { Applied, Catch, Chainable, Computed, Late, Of } from "silentium";
import { Template } from "silentium-components";

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
    $list,
  );
  $search.chain(list.$listFilter);
  Chainable(list.$error).chain(Catch($list));

  list.$page.then(console.log);

  return Template(
    (t) => `
    <div>
      ${t.var(ArticleFilter(list.$filter, list.$search, list.$reset))}
      ${t.var(Computed((v) => (v ? "Loading..." : ""), list.$loading))}
      ${t.var($template)}
      <hr class="mt-2 mb-2" />
      <div class="flex gap-2">
        ${t.var(Button("1", "btn", list.$page, "", 1))}
        ${t.var(Button("2", "btn", list.$page, "", 2))}
        ${t.var(Button("3", "btn", list.$page, "", 3))}
      </div>
    </div>
  `,
  );
}
