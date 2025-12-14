import { Button } from "@/components/Button";
import { ListPaginated } from "@/models/common/ListPaginated";
import { PagesRange } from "@/models/common/PagesRange";
import { TemplateItem } from "@/modules/app/template/TemplateItem";
import { TemplateList } from "@/modules/app/template/TemplateList";
import { CategoryConfig } from "@/pages/Admin/Category/CategoryConfig";
import { $title, Tr } from "@/store";
import { join, partial, partialRight } from "lodash-es";
import { Applied, Computed, Late, Map, Primitive } from "silentium";
import { Template } from "silentium-components";

export function CategoryList() {
  const $t = Tr("Categories");
  $title.chain($t);
  const $config = CategoryConfig();

  const $filter = Late<object>({});
  const { $template, $list, $total } = TemplateList(
    $config,
    Tr("Create section"),
    $filter,
    partial(TemplateItem, $config),
  );
  const list = ListPaginated(() => ({}), $list);
  $filter.chain(list.$listFilter);
  const $pages = Computed(PagesRange, $total, list.limit);

  return Template(
    (t) => `
    <div class="articles">
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
