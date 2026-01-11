import { Pagination } from "@/components/ui/Pagination";
import { ListPaginated } from "@/models/common/ListPaginated";
import { PagesRange } from "@/models/common/PagesRange";
import { TemplateItem } from "@/modules/app/template/TemplateItem";
import { TemplateList } from "@/modules/app/template/TemplateList";
import { Tr } from "@/modules/I18n";
import { html } from "@/modules/plugins/lang/html";
import { SectionConfig } from "@/pages/Admin/Section/SectionConfig";
import { partial } from "lodash-es";
import { Computed, Context, Late } from "silentium";
import { Template } from "silentium-components";

export function SectionList() {
  Context("title").chain(Tr("Sections"));
  const $config = SectionConfig();

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
    (t) => html`
      <div class="articles">
        ${t.escaped(Computed((v) => (v ? "Loading..." : ""), list.$loading))}
        ${t.raw($template)}
        <hr class="mt-2 mb-2" />
        ${t.raw(Pagination($pages, list.$page))}
      </div>
    `,
  );
}
