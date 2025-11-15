import { Button } from "@/components/Button";
import { CRUD } from "@/modules/app/CRUD";
import { ServerResponse } from "@/modules/app/ServerResponse";
import { i18n } from "@/store";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import {
  FromPromise,
  LateShared,
  Message,
  Of,
  Primitive,
  Shared,
} from "silentium";
import { Record, Shot, Template, Transaction } from "silentium-components";
import { Log } from "silentium-web-api";

/**
 * Configuration page
 */
export function Configuration() {
  return Message<string>((transport) => {
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
        startRegistration({
          optionsJSON: Primitive(data).primitiveWithException() as any,
        }),
        Log("fido error"),
      );
    });

    const $regFinish = Shared(
      ServerResponse(
        CRUD(Of("auth/registration/finish"))
          .created(
            Record({
              data: $fidoData,
              username,
            }),
          )
          .result(),
      ),
    );

    $regStart.to(Log("formUpdated"));
    $regFinish.to(Log("regFinish"));

    const $authenticated = LateShared();

    const $loginStart = Shared(
      ServerResponse(
        CRUD(Of("auth/login/start"))
          .created(Shot(Of({ username }), $authenticated))
          .result(),
      ),
    );
    const $fidoAuthData = Transaction($loginStart, (data) => {
      return FromPromise(
        startAuthentication({
          optionsJSON: Primitive(data).primitiveWithException() as any,
        }),
        Log("fido auth error"),
      );
    });

    const $loginFinish = Shared(
      ServerResponse(
        CRUD(Of("auth/login/finish"))
          .created(
            Record({
              data: $fidoAuthData,
              username,
            }),
            Of("include"),
          )
          .result(),
      ),
    );

    $authenticated.to(Log("authenticated"));
    $loginFinish.to(Log("loginFinish"));

    const t = Template();
    t.template(`<div class="article">
			<h1 class="title-1">Конфигурирование системы</h1>
      <p class="mb-2">
          Перед использованием панели администратора
          необходимо провести конфигурацию сервера,
          Укажите обязательные параметры
      </p>
      <div class="mb-2">
        ${t.var(Button(Of("Войти"), Of("btn"), $authenticated))}
      </div>
      <div>
        ${t.var(Button(Of("Регистрация"), Of("btn"), $register))}
      </div>
		</div>`);
    t.to(transport);

    return () => {
      t.destroy();
    };
  });
}
