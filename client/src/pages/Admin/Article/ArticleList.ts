import { Published } from "@/components/common/Published";
import { Button } from "@/components/ui/Button";
import { ListPaginated } from "@/models/common/ListPaginated";
import { PagesRange } from "@/models/common/PagesRange";
import { TemplateItem } from "@/modules/app/template/TemplateItem";
import { TemplateList } from "@/modules/app/template/TemplateList";
import { Tr } from "@/modules/I18n";
import { html } from "@/modules/plugins/lang/html";
import { ArticleConfig } from "@/pages/Admin/Article/ArticleConfig";
import { ArticleFilter } from "@/pages/Admin/Article/ArticleFilter";
import { join, partialRight } from "lodash-es";
import {
  Applied,
  Catch,
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
            html`<div class="grid grid-cols-[1fr_1fr] w-full mb-2 gap-2">
              <div>${t.escaped(Path($item, "title"))}</div>
              <div>
                ${t.escaped(Published(Path($item, "published", false)))}
              </div>
            </div>`,
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
  list.$error.chain(Catch($list));
  const $pages = Computed(PagesRange, $total, list.limit);

  return Template(
    (t) => html`
      <div class="articles">
        ${t.raw(ArticleFilter(list.$filter, list.$search, list.$reset))}
        ${t.escaped(Computed((v) => (v ? "Loading..." : ""), list.$loading))}
        ${t.raw($template)}
        <hr class="mt-2 mb-2" />
        <div class="flex gap-2">
          ${t.raw(
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
