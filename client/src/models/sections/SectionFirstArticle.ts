import { ServerResponse } from "@/modules/app/ServerResponse";
import { Markable } from "@/modules/plugins/markable/Markable";
import { Computed, Context } from "silentium";
import { Path } from "silentium-components";

export function SectionFirstArticle(section: string) {
  return Computed(
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
      "0.content",
      "",
    ),
  );
}
