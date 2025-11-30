import { CRUD } from "@/modules/app/CRUD";
import { ServerResponse } from "@/modules/app/ServerResponse";
import { SectionConfig } from "@/pages/Admin/Section/SectionConfig";
import { SectionType } from "@/types/SectionType";
import { Of, Shared } from "silentium";

export function Sections() {
  return Shared<SectionType[]>(
    ServerResponse(CRUD(SectionConfig().model).list(Of({}))),
  );
}
