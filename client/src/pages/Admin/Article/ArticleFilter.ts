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
  const $code = Part<string>($filter, "code");
  return Template(
    (t) => html`
      <div class="mb-4">
        <div class="flex gap-2 mb-2">
          <div>
            <span>${t.escaped(Tr("Title"))}</span>
            ${t.raw(Input($title))}
          </div>
          <div>
            <span>${t.escaped(Tr("Code"))}</span>
            ${t.raw(Input($code))}
          </div>
        </div>
        <div class="flex gap-2">
          ${t.raw(Button(Tr("Search"), Of("btn"), $searched))}
          ${t.raw(Button(Tr("Reset"), Of("btn"), $reset))}
        </div>
      </div>
    `,
  );
}
