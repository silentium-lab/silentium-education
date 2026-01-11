import { Button } from "@/components/ui/Button";
import { html } from "@/modules/plugins/lang/html";
import { join, partialRight } from "lodash-es";
import {
  Applied,
  Map,
  MessageType,
  Of,
  Primitive,
  SourceType,
} from "silentium";
import { BranchLazy, Detached, Template } from "silentium-components";

export function Pagination(
  $pages: MessageType<number[]>,
  $page: SourceType<number>,
) {
  const pagesDetached = Detached($pages);
  return Template(
    (t) =>
      html`<div class="flex gap-2">
        ${t.raw(
          BranchLazy(
            Applied($pages, (p) => p.length > 1),
            () =>
              Applied(
                Map(pagesDetached, (page) =>
                  Button(page, "btn", $page, "", Primitive(page).primitive()),
                ),
                partialRight(join, ""),
              ),
            () => Of(""),
          ),
        )}
      </div>`,
  );
}
