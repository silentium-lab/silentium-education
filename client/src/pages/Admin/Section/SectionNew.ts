import { TemplateNew } from "@/modules/app/template/TemplateNew";
import { Tr } from "@/modules/I18n";
import { SectionConfig } from "@/pages/Admin/Section/SectionConfig";
import { SectionForm } from "@/pages/Admin/Section/SectionForm";
import { Context } from "silentium";

export function SectionNew() {
  Context("title").chain(Tr("Create section"));
  return TemplateNew(SectionConfig(), Tr("Sections"), SectionForm, {
    title: undefined,
    code: undefined,
    published: undefined,
  });
}
