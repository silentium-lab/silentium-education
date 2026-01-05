import { html } from "@/modules/plugins/lang/html";
import {
  ConstructorType,
  Late,
  MessageSourceType,
  MessageType,
  SourceType,
} from "silentium";
import { Template } from "silentium-components";

export function TranslatedForm(
  $form: MessageSourceType<any>,
  validated: SourceType<boolean>,
  formBuild: ConstructorType<
    [MessageSourceType<any>, SourceType<boolean>],
    MessageType<string>
  >,
) {
  const $lang = Late("ru");
  return Template((t) => html`<div>form ${t.escaped($lang)}</div>`);
}
