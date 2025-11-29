import { Link } from "@/components/Link";
import { CRUD } from "@/modules/app/CRUD";
import { ServerResponse } from "@/modules/app/ServerResponse";
import { SectionConfig } from "@/pages/Admin/Section/SectionConfig";
import { SectionItem } from "@/pages/Admin/Section/SectionItem";
import { $title, i18n } from "@/store";
import {
  Any,
  Applied,
  Chain,
  LateShared,
  Local,
  Map,
  Message,
  MessageType,
  Of,
  Shared,
} from "silentium";
import { Template } from "silentium-components";

export function SectionList() {
  return Message<string>((transport) => {
    $title.chain(i18n.tr("Sections"));
    const config = SectionConfig();

    const $reload = LateShared(1);
    const $articlesSearch = LateShared({});
    const $articles = Shared(
      ServerResponse(
        CRUD(config.model).list(Chain($reload, $articlesSearch)),
      ) as MessageType<any[]>,
    );

    const t = Template();
    t.template(`<div class="article">
        <h1 class="title-1">${t.var(Local($title))}</h1>
        ${t.var(Link(Of(`${config.path}/create`), i18n.tr("Create section"), Of("block mb-3 underline")))}
        ${t.var(
          Applied(
            Any<any>(
              Chain($articlesSearch, Of([])),
              Map($articles, (article) => {
                return SectionItem(article, $reload);
              }),
            ),
            (a) => a.join(""),
          ),
        )}
      </div>`);
    t.then(transport);

    return () => {
      $articles.destroy();
      t.destroy();
    };
  });
}
