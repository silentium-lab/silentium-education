import { CRUD } from "@/modules/app/CRUD";
import { ServerResponse } from "@/modules/app/ServerResponse";
import { CategoryConfig } from "@/pages/Admin/Category/CategoryConfig";
import { CategoryType } from "@/types/CategoryType";
import { Of, Shared } from "silentium";
import { Path } from "silentium-components";

export function Categories() {
  return Shared<CategoryType[]>(
    ServerResponse(CRUD(Path(CategoryConfig(), "model")).list(Of({}))),
  );
}
