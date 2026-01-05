import { TranslatedForm } from "@/components/common/TranslatedForm";
import { TemplateEdit } from "@/modules/app/template/TemplateEdit";
import { Tr } from "@/modules/I18n";
import { SectionConfig } from "@/pages/Admin/Section/SectionConfig";
import { SectionForm } from "@/pages/Admin/Section/SectionForm";
import { partial } from "lodash-es";
import { Context } from "silentium";

export function SectionEdit() {
  Context("title").chain(Tr("Section"));
  return TemplateEdit(
    SectionConfig(),
    Tr("Sections"),
    partial(TranslatedForm, SectionForm),
  );
}
