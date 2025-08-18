import morphdom from "morphdom";
import { all, InformationType } from "silentium";

/**
 * Represents a function that renders HTML string into an element
 */
export const render = (
  rootSrc: InformationType<HTMLElement>,
  htmlSrc: InformationType<string>,
): InformationType<HTMLElement> => {
  return (o) => {
    all(
      rootSrc,
      htmlSrc,
    )(([root, html]) => {
      morphdom(root, html);
      o(root);
    });
  };
};
