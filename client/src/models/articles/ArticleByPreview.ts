import { ServerResponse } from "@/modules/app/ServerResponse";
import { TrDynamic } from "@/modules/I18n";
import { Markable } from "@/modules/plugins/markable/Markable";
import { NotFound } from "@/pages/NotFound";
import { partial } from "lodash-es";
import {
  Applied,
  Catch,
  Computed,
  Context,
  Default,
  Empty,
  Lazy,
  MessageType,
  Shared,
} from "silentium";
import { Path, Record } from "silentium-components";

export function ArticleByPreview(code: MessageType<string>) {
  const $lang = Context<string>("lang");
  const $resp = Shared<string>(
    Context(
      "request",
      Record({
        method: "get",
        model: "private/article",
        query: Record({
          code,
        }),
        credentials: "include",
      }),
    ),
  );
  const $error = Catch($resp);
  return Computed(
    Markable,
    Default(
      Empty(
        Path<string>(
          ServerResponse($resp),
          Applied($lang, partial(TrDynamic, "content", "$l.content")),
        ),
        $error,
      ),
      Lazy(NotFound),
    ),
  );
}
