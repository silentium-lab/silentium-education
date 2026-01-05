import { Button } from "@/components/ui/Button";
import { html } from "@/modules/plugins/lang/html";
import { Mount } from "@/modules/render/Mount";
import { eq } from "lodash-es";
import {
  Applied,
  Computed,
  ConstructorType,
  Late,
  MessageSourceType,
  MessageType,
  Of,
  SourceType,
} from "silentium";
import { BranchLazy, Part, Template } from "silentium-components";

export function TranslatedForm(
  formBuild: ConstructorType<
    [MessageSourceType<any>, SourceType<boolean>],
    MessageType<string>
  >,
  $form: MessageSourceType<any>,
  validated: SourceType<boolean>,
) {
  const $lang = Late("ru");
  const $formEn = Part($form, "en", {});
  return Template(
    (t) =>
      html`<div class="pt-2">
        <div class="flex gap-2 mb-2">
          ${t.raw(Button("ru", "btn", $lang, "", "ru"))}
          ${t.raw(Button("en", "btn", $lang, "", "en"))}
        </div>
        <div class="mb-2">
          ${t.raw(Mount(Applied($lang, (l) => `Форма для языка ${l}`)))}
        </div>
        <div class="translation-ru">
          ${t.raw(
            Mount(
              BranchLazy(
                Computed(eq, $lang, "ru"),
                () => formBuild($form, validated),
                () => Of("<div></div>"),
              ),
            ),
          )}
        </div>
        <div class="translation-en">
          ${t.raw(
            Mount(
              BranchLazy(
                Computed(eq, $lang, "en"),
                () => formBuild($formEn, validated),
                () => Of("<div></div>"),
              ),
            ),
          )}
        </div>
      </div>`,
  );
}
