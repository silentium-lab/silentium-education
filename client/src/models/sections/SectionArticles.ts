import { ServerResponse } from "@/modules/app/ServerResponse";
import { Actual, Context, MaybeMessage, Shared } from "silentium";
import { Record } from "silentium-components";

export function SectionArticles(code: MaybeMessage<string>) {
  return Shared(
    ServerResponse(
      Context(
        "request",
        Record({
          method: "get",
          model: "articles",
          query: Record({
            section: Actual(code),
          }),
        }),
      ),
    ),
  );
}
