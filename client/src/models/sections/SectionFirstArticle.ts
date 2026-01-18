import { ServerResponse } from "@/modules/app/ServerResponse";
import { TrDynamic } from "@/modules/I18n";
import { Markable } from "@/modules/plugins/markable/Markable";
import { partial } from "lodash-es";
import { Applied, Computed, Context, Shared } from "silentium";
import { Path } from "silentium-components";

export function SectionFirstArticle(section: string) {
  const $lang = Context<string>("lang");
  return Shared(
    Computed(
      Markable,
      Path<string>(
        ServerResponse(
          Context("request", {
            method: "get",
            model: "articles",
            query: {
              section,
            },
          }),
        ),
        Applied($lang, partial(TrDynamic, "0.content", "0.$l.content")),
        "",
      ),
    ),
  );
}
