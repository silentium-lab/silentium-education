import { Button } from "@/components/Button";
import { CRUD } from "@/modules/app/CRUD";
import { ServerResponse } from "@/modules/app/ServerResponse";
import { i18n } from "@/store";
import { fido2Create } from "@ownid/webauthn";
import {
  Event,
  EventType,
  FromPromise,
  LateShared,
  Of,
  Primitive,
  Shared,
} from "silentium";
import { Shot, Template, Transaction } from "silentium-components";
import { Log } from "silentium-web-api";

/**
 * Configuration page
 */
export function Configuration(): EventType<string> {
  return Event((transport) => {
    i18n.tr("Configuration");

    const $register = LateShared();

    const username = "Test";
    const $regStart = Shared(
      ServerResponse(
        CRUD(Of("auth/registration/start"))
          .created(Shot(Of({ username }), $register))
          .result(),
      ),
    );

    const $fidoData = Transaction($regStart, (data) => {
      return FromPromise(
        fido2Create(Primitive(data).primitiveWithException(), username),
        Log("fido error"),
      );
    });

    const $regFinish = Shared(
      ServerResponse(
        CRUD(Of("auth/registration/finish")).created($fidoData).result(),
      ),
    );

    $regStart.event(Log("formUpdated"));
    $regFinish.event(Log("regFinish"));

    const t = Template();
    t.template(`<div class="article">
			<h1 class="title-1">Конфигурирование системы</h1>
            <p class="mb-2">
                Перед использованием панели администратора
                необходимо провести конфигурацию сервера,
                Укажите обязательные параметры
            </p>
            ${t.var(Button(Of("Регистрация"), Of("btn"), $register))}
		</div>`);
    t.event(transport);

    return () => {
      t.destroy();
    };
  });
}
