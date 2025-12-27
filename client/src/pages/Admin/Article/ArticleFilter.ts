import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { html } from "@/modules/plugins/lang/html";
import { Tr } from "@/store";
import { MessageSourceType, Of, SourceType } from "silentium";
import { Part, Template } from "silentium-components";

export function ArticleFilter(
  $filter: MessageSourceType<any>,
  $searched: SourceType,
  $reset: SourceType,
) {
  const $title = Part<string>($filter, "title");
  return Template(
    (t) => html`
      <div class="mb-4">
        <div class="mb-2">
          <span>${t.escaped(Tr("Title"))}</span>
          ${t.raw(Input($title))}
        </div>
        <div class="flex gap-2">
          ${t.raw(Button(Tr("Search"), Of("btn"), $searched))}
          ${t.raw(Button(Tr("Reset"), Of("btn"), $reset))}
        </div>
      </div>
    `,
  );
}
