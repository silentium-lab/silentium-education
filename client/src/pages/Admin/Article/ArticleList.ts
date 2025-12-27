import { Button } from "@/components/Button";
import { Published } from "@/components/common/Published";
import { ListPaginated } from "@/models/common/ListPaginated";
import { PagesRange } from "@/models/common/PagesRange";
import { TemplateItem } from "@/modules/app/template/TemplateItem";
import { TemplateList } from "@/modules/app/template/TemplateList";
import { html } from "@/modules/plugins/lang/html";
import { Encoded } from "@/modules/string/Encoded";
import { ArticleConfig } from "@/pages/Admin/Article/ArticleConfig";
import { ArticleFilter } from "@/pages/Admin/Article/ArticleFilter";
import { Tr } from "@/store";
import { join, partialRight } from "lodash-es";
import {
  Applied,
  Catch,
  Chainable,
  Computed,
  Context,
  Late,
  Map,
  Primitive,
} from "silentium";
import { Branch, Path, Template } from "silentium-components";

export function ArticleList() {
  Context("title").chain(Tr("Articles"));
  const $config = ArticleConfig();
  const $filter = Late<object>();
  const { $template, $list, $total } = TemplateList(
    $config,
    Tr("Create article"),
    $filter,
    ($item: any, $reload) =>
      TemplateItem(
        $config,
        $item,
        $reload,
        Template(
          (t) =>
            `<div class="grid grid-cols-[1fr_1fr] w-full mb-2 gap-2"><div>${t.var(Encoded(Path($item, "title")))}</div><div>${t.var(Published(Path($item, "published", false)))}</div></div>`,
        ),
      ),
  );
  const list = ListPaginated(
    () => ({
      title: "",
    }),
    $list,
  );
  $filter.chain(list.$listFilter);
  Chainable(list.$error).chain(Catch($list));

  const $pages = Computed(PagesRange, $total, list.limit);

  return Template(
    (t) => html`
      <div class="articles">
        ${t.var(ArticleFilter(list.$filter, list.$search, list.$reset))}
        ${t.var(Computed((v) => (v ? "Loading..." : ""), list.$loading))}
        ${t.var($template)}
        <hr class="mt-2 mb-2" />
        <div class="flex gap-2">
          ${t.var(
            Branch(
              Applied($pages, (p) => p.length > 1),
              Applied(
                Map($pages, (page) =>
                  Button(
                    page,
                    "btn",
                    list.$page,
                    "",
                    Primitive(page).primitive(),
                  ),
                ),
                partialRight(join, ""),
              ),
              "",
            ),
          )}
        </div>
      </div>
    `,
  );
}
