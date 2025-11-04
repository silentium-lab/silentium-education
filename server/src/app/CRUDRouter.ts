import { IncomingMessage } from "http";
import { Db } from "mongodb";
import {
  Any,
  Catch,
  ConstructorType,
  EventType,
  Late,
  LateShared,
  Of,
  TransportEvent,
} from "silentium";
import { Detached, RecordOf, Router, Shot, ToJson } from "silentium-components";
import { NotFoundSrc } from "../../store";
import { Created } from "../modules/mongo/Created";
import { Entity } from "../modules/mongo/Entity";
import { List } from "../modules/mongo/List";
import { Removed } from "../modules/mongo/Removed";
import { Updated } from "../modules/mongo/Updated";
import { Query } from "../modules/string/Query";
import { UrlFromMessage } from "../modules/string/UrlFromMessage";

export const CRUDRouter = (
  req: EventType<IncomingMessage>,
  dbTransport: ConstructorType<[], EventType<Db>>,
  baseUrl: string,
  collectionName: string,
): EventType<string> => {
  const detachedReq = Detached<any>(req);
  return Router<string>(
    Query(detachedReq),
    Of([
      {
        pattern: `^GET:${baseUrl}$`,
        event: TransportEvent(() => {
          const error = LateShared();
          const $data = Catch(List(dbTransport(), collectionName), error);
          return ToJson(
            RecordOf({
              data: $data,
              error: Any(error, Shot(Of(null), $data)),
            }),
          );
        }),
      },
      {
        pattern: `^GET:${baseUrl}/.+/$`,
        event: TransportEvent(() => {
          const $url = UrlFromMessage(detachedReq);
          const error = Late();
          const $data = Catch(
            Entity(dbTransport(), $url, collectionName),
            error,
          );
          return ToJson(
            RecordOf({
              data: $data,
              error: Any(error, Shot(Of(null), $data)),
            }),
          );
        }),
      },
      {
        pattern: `^POST:${baseUrl}$`,
        event: TransportEvent(() => {
          const error = Late();
          const $data = Catch(
            Created(dbTransport(), detachedReq, collectionName),
            error,
          );
          return ToJson(
            RecordOf({
              data: $data,
              error: Any(error, Shot(Of(null), $data)),
            }),
          );
        }),
      },
      {
        pattern: `^PUT:${baseUrl}/.+/$`,
        event: TransportEvent(() => {
          const error = Late();
          const $data = Catch(
            Updated(dbTransport(), detachedReq, collectionName),
            error,
          );
          return ToJson(
            RecordOf({
              data: $data,
              error: Any(error, Shot(Of(null), $data)),
            }),
          );
        }),
      },
      {
        pattern: `^DELETE:${baseUrl}/.+/$`,
        event: TransportEvent(() => {
          const error = Late();
          const $url = UrlFromMessage(detachedReq);
          const $data = Catch(
            Removed(dbTransport(), $url, collectionName),
            error,
          );
          return ToJson(
            RecordOf({
              data: $data,
              error: Any(error, Shot(Of(null), $data)),
            }),
          );
        }),
      },
    ]),
    NotFoundSrc,
  );
};
