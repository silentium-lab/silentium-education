import { TemplateNew } from "@/modules/app/template/TemplateNew";
import { SectionConfig } from "@/pages/Admin/Section/SectionConfig";
import { SectionForm } from "@/pages/Admin/Section/SectionForm";
import { $title, i18n } from "@/store";

export function SectionNew() {
  const $label = i18n.tr("Create section");
  $title.chain($label);
  return TemplateNew(SectionConfig(), $label, SectionForm, {
    title: undefined,
  });
}
