import {
  ServerAllResponse,
  ServerResponse,
} from "@/modules/app/ServerResponse";
import {
  ActualMessage,
  Context,
  Default,
  MaybeMessage,
  Shared,
} from "silentium";
import { Record } from "silentium-components";

export function CategoryArticles(category: MaybeMessage<string>) {
  return Shared(
    Default(
      ServerResponse(
        Context(
          "request",
          Record({
            method: "get",
            model: "articles",
            query: Record({
              category: ActualMessage(category),
            }),
          }),
        ),
      ),
      [],
    ),
  );
}

export function CategoryArticlesWithMeta(category: MaybeMessage<string>) {
  return Shared(
    Default(
      ServerAllResponse(
        Context(
          "request",
          Record({
            method: "get",
            model: "articles",
            query: Record({
              category: ActualMessage(category),
            }),
          }),
        ),
      ),
      [],
    ),
  );
}
