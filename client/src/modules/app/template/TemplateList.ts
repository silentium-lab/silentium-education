import { Link } from "@/components/Link";
import { CRUD } from "@/modules/app/CRUD";
import { ServerResponse } from "@/modules/app/ServerResponse";
import { TemplateConfig } from "@/modules/app/template/TemplateConfig";
import { $title } from "@/store";
import {
  Any,
  Applied,
  Chain,
  ConstructorType,
  Late,
  Local,
  Map,
  MessageType,
  Of,
  Shared,
  SourceType,
} from "silentium";
import { Path, Template } from "silentium-components";

export function TemplateList(
  $config: MessageType<TemplateConfig>,
  $creationLabel: MessageType<string>,
  itemTemplate: ConstructorType<[MessageType, SourceType], MessageType<string>>,
) {
  const $reload = Late<any>();
  const $search = Late({});
  const $articles = Shared(
    ServerResponse(CRUD(Path($config, "model")).list(Any($reload, $search))),
  );

  $reload.then(console.log);

  return Template(
    (t) => `<div class="article">
      <h1 class="title-1">${t.var(Local($title))}</h1>
      ${t.var(
        Link(
          Applied($config, (c) => `${c.path}/create`),
          $creationLabel,
          Of("block mb-3 underline"),
        ),
      )}
      ${t.var(
        Applied(
          Any<any>(
            Chain($search, Of([])),
            Map($articles, (article) => itemTemplate(article, $reload)),
          ),
          (a) => a.join(""),
        ),
      )}
    </div>`,
  );
}
