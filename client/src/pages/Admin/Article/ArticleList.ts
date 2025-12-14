import { Button } from "@/components/Button";
import { ListPaginated } from "@/models/common/ListPaginated";
import { PagesRange } from "@/models/common/PagesRange";
import { TemplateItem } from "@/modules/app/template/TemplateItem";
import { TemplateList } from "@/modules/app/template/TemplateList";
import { ArticleConfig } from "@/pages/Admin/Article/ArticleConfig";
import { ArticleFilter } from "@/pages/Admin/Article/ArticleFilter";
import { $title, Tr } from "@/store";
import { join, partial, partialRight } from "lodash-es";
import {
  Applied,
  Catch,
  Chainable,
  Computed,
  Late,
  Map,
  Primitive,
} from "silentium";
import { Concatenated, Path, Template } from "silentium-components";

export function ArticleList() {
  const $t = Tr("Articles");
  $title.chain($t);
  const $config = ArticleConfig();
  const $filter = Late<any>();
  const { $template, $list, $meta } = TemplateList(
    $config,
    Tr("Create article"),
    $filter,
    partial(TemplateItem, $config),
  );
  const list = ListPaginated(
    () => ({
      title: "",
    }),
    $list,
  );
  $filter.chain(list.$listFilter);
  Chainable(list.$error).chain(Catch($list));

  list.$page.then(console.log);
  const $pages = Computed(PagesRange, Path($meta, "total"), list.limit);

  return Template(
    (t) => `
    <div>
      ${t.var(ArticleFilter(list.$filter, list.$search, list.$reset))}
      ${t.var(Computed((v) => (v ? "Loading..." : ""), list.$loading))}
      ${t.var($template)}
      <hr class="mt-2 mb-2" />
      <div class="flex gap-2">
        ${t.var(
          Applied(
            Map($pages, (page) =>
              Button(page, "btn", list.$page, "", Primitive(page).primitive()),
            ),
            partialRight(join, ""),
          ),
        )}
      </div>
    </div>
  `,
  );
}
