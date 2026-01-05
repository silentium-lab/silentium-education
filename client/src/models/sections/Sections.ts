import { CRUDList } from "@/modules/app/crud/CRUDList";
import { ServerResponse } from "@/modules/app/ServerResponse";
import { SectionConfig } from "@/pages/Admin/Section/SectionConfig";
import { SectionType } from "@/types/SectionType";
import { Of, Shared } from "silentium";
import { Path } from "silentium-components";

export function Sections() {
  return Shared<SectionType[]>(
    ServerResponse(CRUDList(Path(SectionConfig(), "model"), Of({}))),
  );
}
