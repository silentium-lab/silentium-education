import { ClassName } from "@/modules/ClassName";
import { Id } from "@/modules/Id";
import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";
import {
  All,
  Any,
  Chainable,
  Connected,
  DestroyContainer,
  Message,
  MessageSourceType,
  MessageType,
  Once,
  Shared,
} from "silentium";
import { Template } from "silentium-components";
import { Element } from "silentium-web-api";

const EditorValue = (
  $el: MessageType<HTMLElement>,
  $value: MessageType<string>,
) =>
  Shared(
    Message<string>((resolve, reject) => {
      const dc = DestroyContainer();

      All($el, Any(Once($value), ""))
        .catch(reject)
        .then(([element, value]) => {
          dc.destroy();
          let easyMDE: EasyMDE | null = new EasyMDE({
            element,
            initialValue: value,
            spellChecker: false,
            toolbar: [
              "bold",
              "italic",
              "heading",
              "strikethrough",
              "|",
              "quote",
              "code",
              "unordered-list",
              "ordered-list",
              "clean-block",
              "|",
              "image",
            ],
          });
          dc.add(() => {
            if (easyMDE !== null) {
              easyMDE.toTextArea();
              easyMDE.cleanup();
              easyMDE = null;
            }
          });
          easyMDE.codemirror.on("change", () => {
            if (easyMDE !== null) {
              resolve(easyMDE.value());
            }
          });
        });

      return dc.destructor();
    }),
  );

/**
 * Visual editor
 */
export function Editor($value: MessageSourceType<string>) {
  const $id = Shared(Id());
  const $el = Shared(Element<HTMLInputElement>(ClassName($id)));
  const $editorValue = EditorValue($el, $value);
  Chainable($value).chain($editorValue);
  return Connected(
    Template((t) => `<textarea class="${t.var($id)}"></textarea>`),
    $editorValue,
    $el,
  );
}
