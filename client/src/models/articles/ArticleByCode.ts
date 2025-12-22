import { ServerResponse } from "@/modules/app/ServerResponse";
import { Markable } from "@/modules/plugins/markable/Markable";
import { Computed, Context, MessageType, Shared } from "silentium";
import { Path, Record } from "silentium-components";

export function ArticleByCode(code: MessageType<string>) {
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
        "content",
        "",
      ),
    ),
  );
}
