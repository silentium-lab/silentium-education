import { TemplateItem } from "@/modules/app/template/TemplateItem";
import { TemplateList } from "@/modules/app/template/TemplateList";
import { SectionConfig } from "@/pages/Admin/Section/SectionConfig";
import { $title, Tr } from "@/store";
import { partial } from "lodash-es";

export function SectionList() {
  const $t = Tr("Sections");
  $title.chain($t);
  const $config = SectionConfig();
  return TemplateList(
    $config,
    Tr("Create section"),
    partial(TemplateItem, $config),
  );
}
