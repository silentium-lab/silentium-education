import { ServerResponse } from "@/modules/app/ServerResponse";
import { Markable } from "@/modules/plugins/markable/Markable";
import { Computed, Context } from "silentium";
import { Path } from "silentium-components";

export class Section {
  public constructor(private section: string) {}

  public firstArticleContent() {
    return Computed(
      Markable,
      Path<string>(
        ServerResponse(
          Context("request", {
            method: "get",
            model: "articles",
            query: {
              code: this.section,
            },
          }),
        ),
        "0.content",
        "",
      ),
    );
  }
}
