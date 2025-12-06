import { TemplateEdit } from "@/modules/app/template/TemplateEdit";
import { SectionConfig } from "@/pages/Admin/Section/SectionConfig";
import { SectionForm } from "@/pages/Admin/Section/SectionForm";
import { $title, Tr } from "@/store";

export function SectionEdit() {
  $title.chain(Tr("Section"));
  return TemplateEdit(SectionConfig(), Tr("Sections"), SectionForm);
}
