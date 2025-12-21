import { Link } from "@/components/Link";
import { CRUD } from "@/modules/app/CRUD";
import { ServerMeta, ServerResponse } from "@/modules/app/ServerResponse";
import { TemplateConfig } from "@/modules/app/template/TemplateConfig";
import { $title } from "@/store";
import { clone } from "lodash-es";
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
import { Path, Polling, Template } from "silentium-components";

export function TemplateList(
  $config: MessageType<TemplateConfig>,
  $creationLabel: MessageType<string>,
  $filter: MessageType<object>,
  itemTemplate: ConstructorType<[MessageType, SourceType], MessageType<string>>,
) {
  const $reload = Late<any>();
  const $listResponse = Shared<string>(
    CRUD(Path($config, "model")).list(
      Any(Polling<any>(Applied($filter, clone), $reload), $filter),
    ),
  );
  const $list = Shared(ServerResponse($listResponse));
  const $meta = ServerMeta($listResponse);
  const $total = Path($meta, "total");

  return {
    $list: $list,
    $meta,
    $total,
    $template: Template(
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
