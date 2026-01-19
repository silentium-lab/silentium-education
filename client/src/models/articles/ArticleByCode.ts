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

export function ArticleByCode(code: MessageType<string>) {
  const $lang = Context<string>("lang");
  const $resp = Shared<string>(
    Context(
      "request",
      Record({
        method: "get",
        model: "articles",
        query: Record({
          code,
        }),
      }),
    ),
  );
  const $error = Catch($resp);
  const $title = Context("title");
  const $articleData = ServerResponse($resp);
  $title.chain(
    Path($articleData, Applied($lang, partial(TrDynamic, "title", "$l.title"))),
  );
  return Shared(
    Computed(
      Markable,
      Default(
        Empty(
          Path<string>(
            $articleData,
            Applied($lang, partial(TrDynamic, "content", "$l.content")),
          ),
          $error,
        ),
        Lazy(NotFound),
      ),
    ),
  );
}
