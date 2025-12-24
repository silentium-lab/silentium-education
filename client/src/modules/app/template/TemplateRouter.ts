import { TemplateConfig } from "@/modules/app/template/TemplateConfig";
import { NotFound } from "@/pages/NotFound";
import { All, Applied, ConstructorType, Context, MessageType } from "silentium";
import { Record, Router } from "silentium-components";

export function TemplateRouter(
  $config: MessageType<TemplateConfig>,
  listTemplate: ConstructorType<[], MessageType>,
  newTemplate: ConstructorType<[], MessageType>,
  editTemplate: ConstructorType<[], MessageType>,
) {
  const $url = Context<string>("url");

  return Router(
    $url,
    All(
      Record({
        pattern: Applied($config, (c) => `^${c.path}$`),
        message: listTemplate,
      }),
      Record({
        pattern: Applied($config, (c) => `^${c.path}/create$`),
        message: newTemplate,
      }),
      Record({
        pattern: Applied($config, (c) => String.raw`^${c.path}/.+/$`),
        message: editTemplate,
      }),
    ),
    NotFound,
  );
}
