import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
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
    (t) => `
        <div class="mb-4">
          <div class="mb-2">
            <span>${t.var(Tr("Title"))}</span>
            ${t.var(Input($title))}
          </div>
          <div class="flex gap-2">
            ${t.var(Button(Tr("Search"), Of("btn"), $searched))}
            ${t.var(Button(Tr("Reset"), Of("btn"), $reset))}
          </div>
        </div>
    `,
  );
}
