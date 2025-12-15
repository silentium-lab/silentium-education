import { ClassName } from "@/modules/ClassName";
import { Id } from "@/modules/Id";
import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";
import {
  All,
  Any,
  Chainable,
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
          easyMDE.value(value);
          easyMDE.codemirror.on("change", () => {
            if (easyMDE !== null) {
              resolve(easyMDE.value());
            }
          });
        });

      return () => {
        dc.destroy();
      };
    }),
  );

/**
 * Visual editor
 */
export function Editor($value: MessageSourceType<string>) {
  const $id = Shared(Id());
  const $el = Shared(Element<HTMLInputElement>(ClassName($id)));
  Chainable($value).chain(EditorValue($el, $value));
  return Template((t) => `<textarea class="${t.var($id)}"></textarea>`);
}
