import { Button } from "@/components/ui/Button";
import { ListPaginated } from "@/models/common/ListPaginated";
import { PagesRange } from "@/models/common/PagesRange";
import { TemplateItem } from "@/modules/app/template/TemplateItem";
import { TemplateList } from "@/modules/app/template/TemplateList";
import { html } from "@/modules/plugins/lang/html";
import { CategoryConfig } from "@/pages/Admin/Category/CategoryConfig";
import { Tr } from "@/store";
import { join, partial, partialRight } from "lodash-es";
import { Applied, Computed, Context, Late, Map, Primitive } from "silentium";
import { Branch, Template } from "silentium-components";

export function CategoryList() {
  Context("title").chain(Tr("Categories"));
  const $config = CategoryConfig();

  const $filter = Late<object>({});
  const { $template, $list, $total } = TemplateList(
    $config,
    Tr("Create category"),
    $filter,
    partial(TemplateItem, $config),
  );
  const list = ListPaginated(() => ({}), $list);
  $filter.chain(list.$listFilter);
  const $pages = Computed(PagesRange, $total, list.limit);

  return Template(
    (t) => html`
      <div class="articles">
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
