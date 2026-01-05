import { Link } from "@/components/ui/Link";
import { CRUDList } from "@/modules/app/crud/CRUDList";
import { ServerMeta, ServerResponse } from "@/modules/app/ServerResponse";
import { TemplateConfig } from "@/modules/app/template/TemplateConfig";
import { html } from "@/modules/plugins/lang/html";
import { clone } from "lodash-es";
import {
  Any,
  Applied,
  Chain,
  ConstructorType,
  Context,
  Late,
  Map,
  MessageType,
  Of,
  Shared,
  SourceType,
} from "silentium";
import { Path, Polling, Template } from "silentium-components";

export function TemplateList(
  $config: MessageType<TemplateConfig>,
  $creationLabel: MessageType<string>,
  $filter: MessageType<object>,
  itemTemplate: ConstructorType<[MessageType, SourceType], MessageType<string>>,
) {
  const $reload = Late<any>();
  const $listResponse = Shared<string>(
    CRUDList(
      Path($config, "model"),
      Any(Polling<any>(Applied($filter, clone), $reload), $filter),
    ),
  );
  const $list = Shared(ServerResponse($listResponse));
  const $meta = ServerMeta($listResponse);
  const $total = Path($meta, "total");

  const $title = Context<string>("title");

  return {
    $list: $list,
    $meta,
    $total,
    $template: Template(
      (t) =>
        html`<div class="article">
          <h1 class="title-1">${t.escaped($title)}</h1>
          ${t.raw(
            Link(
              Applied($config, (c) => `${c.path}/create`),
              $creationLabel,
              Of("block mb-3 underline"),
            ),
          )}
          ${t.raw(
            Applied(
              Any<any>(
                Chain($filter, Of([])),
                Map($list, (article) => itemTemplate(article, $reload)),
              ),
              (a) => a.join(""),
            ),
          )}
        </div>`,
    ),
  };
}
