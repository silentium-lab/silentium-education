import { ServerResponse } from "@/modules/app/ServerResponse";
import { ActualMessage, Context, MaybeMessage, Shared } from "silentium";
import { Record } from "silentium-components";

export function CategoriesOfSection(code: MaybeMessage<string>) {
  return Shared(
    ServerResponse(
      Context(
        "request",
        Record({
          method: "get",
          model: "categories",
          query: Record({
            sectionCode: ActualMessage(code),
          }),
        }),
      ),
    ),
  );
}
