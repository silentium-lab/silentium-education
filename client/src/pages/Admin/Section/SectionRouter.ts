import { TemplateRouter } from "@/modules/app/template/TemplateRouter";
import { SectionConfig } from "@/pages/Admin/Section/SectionConfig";
import { SectionEdit } from "@/pages/Admin/Section/SectionEdit";
import { SectionList } from "@/pages/Admin/Section/SectionList";
import { SectionNew } from "@/pages/Admin/Section/SectionNew";

export function SectionRouter() {
  return TemplateRouter(SectionConfig(), SectionList, SectionNew, SectionEdit);
}
