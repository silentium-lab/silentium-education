import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { CRUD } from "@/modules/app/CRUD";
import { ServerResponse } from "@/modules/app/ServerResponse";
import { i18n } from "@/store";
import { startRegistration } from "@simplewebauthn/browser";
import { Late, MessageType, Of, Process, Shared } from "silentium";
import { Record, Shot, Template } from "silentium-components";

/**
 * Configuration page
 */
export function Configuration() {
  i18n.tr("Configuration");

  const behavior = ConfigurationBehavior();

  return Template(
    (t) => `<div class="article">
      <h1 class="title-1">${t.var(i18n.tr("System configuration"))}</h1>
      <p class="mb-2">
          ${t.var(i18n.tr("Before using the admin panel, you need to configure the server. Specify the required parameters."))}
      </p>
      <div class="mb-2">
        <input class="${t.var(Input(behavior.$username))} border-1 p-2 rounded-sm w-full" name="username" />
      </div>
      <div>
        ${t.var(Button(Of("Регистрация"), Of("btn"), behavior.$register))}
      </div>
    </div>`,
  );
}

export function ConfigurationBehavior() {
  const $register = Late();

  const $username = Late<string>();
  const $regStart = Shared(
    ServerResponse(
      CRUD("auth/registration/start").created(
        Shot(Record({ username: $username }), $register),
      ),
    ),
  );

  const $authData = Shared(
    Process($regStart, (data: any) => {
      return startRegistration({
        optionsJSON: data,
      }) as MessageType;
    }),
  );

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

  $regFinish.then(() => {
    location.reload();
  });

  return {
    $register,
    $username,
    $regStart,
    $authData,
    $regFinish,
  };
}
