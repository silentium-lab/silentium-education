import { TemplateItem } from "@/modules/app/template/TemplateItem";
import { TemplateList } from "@/modules/app/template/TemplateList";
import { SectionConfig } from "@/pages/Admin/Section/SectionConfig";
import { $title, i18n } from "@/store";
import { partial } from "lodash-es";

export function SectionList() {
  const $t = i18n.tr("Sections");
  $title.chain($t);
  const $config = SectionConfig();
  return TemplateList(
    $config,
    i18n.tr("Create section"),
    partial(TemplateItem, $config),
  );
}
