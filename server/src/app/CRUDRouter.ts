import { IncomingMessage } from "http";
import {
  Any,
  Catch,
  Computed,
  Context,
  Late,
  MessageType,
  Of,
  Race,
  Shared,
} from "silentium";
import { Path, Record, Router, Shot, Tick } from "silentium-components";
import { NotFoundSrc } from "../../store";
import { Created } from "../modules/mongo/Created";
import { Entity } from "../modules/mongo/Entity";
import { ListWithMeta } from "../modules/mongo/List";
import { Removed } from "../modules/mongo/Removed";
import { Updated } from "../modules/mongo/Updated";
import { Query } from "../modules/string/Query";
import { UrlFromMessage } from "../modules/string/UrlFromMessage";
import { UrlParams } from "../modules/string/UrlParams";
import { Truncated } from "../modules/structure/Truncated";
import { OnlyKnownFields } from "../modules/validation/OnlyKnownFIelds";

export const CRUDRouter = (
  baseUrl: string,
  collectionName: string,
): MessageType<object> => {
  const $req = Context<IncomingMessage>("request");
  return Router<any>(
    Query($req),
    [
      {
        pattern: `^GET:${baseUrl}(\\?[^#]*)?$`,
        patternFlags: "g",
        message: () => {
          const $error = Late();
          const $url = Computed(UrlFromMessage, $req);
          const $filter = OnlyKnownFields(
            Race(Computed(UrlParams, $url), Tick(Of({}))),
            ["title", "code", "page", "limit"],
          );
          $error.chain(Path(Catch($filter) as any, "message"));
          const $data = Shared(ListWithMeta(collectionName, $filter));
          return Truncated(
            Record({
              status: Any(200, Shot(Of(500), $error)),
              data: Any(Path($data, "data"), Shot<unknown>(Of(""), $error)),
              meta: Any(Path($data, "meta"), Shot<unknown>(Of(""), $error)),
              error: Any($error, Shot(Of(""), $data)),
            }),
            [""],
          );
        },
      },
      {
        pattern: `^GET:${baseUrl}/.+/$`,
        message: () => {
          const $url = Computed(UrlFromMessage, $req);
          const $error = Late();
          const $data = Shared(Entity($url, collectionName));
          return Truncated(
            Record({
              status: Any(200, Shot(Of(500), $error)),
              data: Any($data, Shot(Of(""), $error)),
              error: Any($error, Shot(Of(""), $data)),
            }),
            [""],
          );
        },
      },
      {
        pattern: `^POST:${baseUrl}$`,
        message: () => {
          const $error = Late();
          const $data = Shared(Created($req, collectionName));
          return Truncated(
            Record({
              status: Any(200, Shot(Of(500), $error)),
              data: Any($data, Shot(Of(""), $error)),
              error: Any($error, Shot(Of(""), $data)),
            }),
            [""],
          );
        },
      },
      {
        pattern: `^PUT:${baseUrl}/.+/$`,
        message: () => {
          const $error = Late();
          const $data = Shared(Updated($req, collectionName));
          return Truncated(
            Record({
              status: Any(200, Shot(Of(500), $error)),
              data: Any($data, Shot(Of(""), $error)),
              error: Any($error, Shot(Of(""), $data)),
            }),
            [""],
          );
        },
      },
      {
        pattern: `^DELETE:${baseUrl}.*$`,
        message: () => {
          const $error = Late();
          const $url = Computed(UrlFromMessage, $req);
          const $data = Shared(Removed($url, collectionName));
          return Truncated(
            Record({
              status: Any(200, Shot(Of(500), $error)),
              data: Any($data, Shot(Of(""), $error)),
              error: Any($error, Shot(Of(""), $data)),
            }),
            [""],
          );
        },
      },
    ],
    NotFoundSrc,
  );
};
