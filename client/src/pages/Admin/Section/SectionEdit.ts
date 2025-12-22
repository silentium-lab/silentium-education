import { TemplateEdit } from "@/modules/app/template/TemplateEdit";
import { SectionConfig } from "@/pages/Admin/Section/SectionConfig";
import { SectionForm } from "@/pages/Admin/Section/SectionForm";
import { Tr } from "@/store";
import { Context } from "silentium";

export function SectionEdit() {
  Context("title").chain(Tr("Section"));
  return TemplateEdit(SectionConfig(), Tr("Sections"), SectionForm);
}
