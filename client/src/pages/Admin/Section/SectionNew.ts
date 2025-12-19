import { TemplateNew } from "@/modules/app/template/TemplateNew";
import { SectionConfig } from "@/pages/Admin/Section/SectionConfig";
import { SectionForm } from "@/pages/Admin/Section/SectionForm";
import { $title, Tr } from "@/store";

export function SectionNew() {
  const $label = Tr("Create section");
  $title.chain($label);
  return TemplateNew(SectionConfig(), Tr("Sections"), SectionForm, {
    title: undefined,
    code: undefined,
  });
}
