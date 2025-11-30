import { TemplateEdit } from "@/modules/app/template/TemplateEdit";
import { SectionConfig } from "@/pages/Admin/Section/SectionConfig";
import { SectionForm } from "@/pages/Admin/Section/SectionForm";
import { $title, i18n } from "@/store";

export function SectionEdit() {
  $title.chain(i18n.tr("Section"));
  return TemplateEdit(SectionConfig(), i18n.tr("Section"), SectionForm);
}
