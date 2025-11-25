import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { CRUD } from "@/modules/app/CRUD";
import { ServerResponse } from "@/modules/app/ServerResponse";
import { i18n } from "@/store";
import { startRegistration } from "@simplewebauthn/browser";
import {
  LateShared,
  Message,
  MessageType,
  Of,
  Process,
  Shared,
} from "silentium";
import { Record, Shot, Template } from "silentium-components";
import { Log } from "silentium-web-api";

/**
 * Configuration page
 */
export function Configuration() {
  return Message<string>((transport) => {
    i18n.tr("Configuration");

    const behavior = ConfigurationBehavior();

    const t = Template();
    t.template(`<div class="article">
			<h1 class="title-1">Конфигурирование системы</h1>
      <p class="mb-2">
          Перед использованием панели администратора
          необходимо провести конфигурацию сервера,
          Укажите обязательные параметры
      </p>
      <div class="mb-2">
        <input class="${t.var(Input(behavior.$username))} border-1 p-2 rounded-sm w-full" name="username" />
      </div>
      <div>
        ${t.var(Button(Of("Регистрация"), Of("btn"), behavior.$register))}
      </div>
		</div>`);
    t.then(transport);

    return () => {
      t.destroy();
    };
  });
}

export function ConfigurationBehavior() {
  const $register = LateShared();

  const $username = LateShared<string>();
  const $regStart = Shared(
    ServerResponse(
      CRUD("auth/registration/start").created(
        Shot(Record({ username: $username }), $register),
      ),
    ),
  );

  const $authData = Process($regStart, (data: any) => {
    return startRegistration({
      optionsJSON: data,
    }) as MessageType;
  });

  const $regFinish = Shared(
    ServerResponse(
      CRUD(Of("auth/registration/finish")).created(
        Record({
          data: $authData,
          username: $username,
        }),
      ),
    ),
  );

  $regFinish.then(Log("regFinish"));

  return {
    $register,
    $username,
    $regStart,
    $authData,
    $regFinish,
  };
}
