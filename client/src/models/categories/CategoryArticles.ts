import { ServerResponse } from "@/modules/app/ServerResponse";
import { Context, MessageType, Shared } from "silentium";
import { Record } from "silentium-components";

export function CategoryArticles(category: MessageType<string>) {
  return Shared(
    ServerResponse(
      Context(
        "request",
        Record({
          method: "get",
          model: "articles",
          query: Record({
            category,
          }),
        }),
      ),
    ),
  );
}
