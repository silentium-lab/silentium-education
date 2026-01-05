import { ServerResponse } from "@/modules/app/ServerResponse";
import { TrDynamic } from "@/modules/I18n";
import { Markable } from "@/modules/plugins/markable/Markable";
import { partial } from "lodash-es";
import { Applied, Computed, Context, MessageType, Shared } from "silentium";
import { Path, Record } from "silentium-components";

export function ArticleByCode(code: MessageType<string>) {
  const $lang = Context<string>("lang");
  return Shared(
    Computed(
      Markable,
      Path<string>(
        ServerResponse(
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
        ),
        Applied($lang, partial(TrDynamic, "content", "$l.content")),
        "",
      ),
    ),
  );
}
