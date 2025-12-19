import { Of } from "silentium";
import { List } from "../modules/mongo/List";
import { Record } from "silentium-components";

export function Articles() {
  const $articles = List(
    "documents",
    Of({
      published: true,
    }),
  );
  return Record({
    data: $articles,
  });
}
