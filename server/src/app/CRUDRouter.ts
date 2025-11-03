import { IncomingMessage } from "http";
import { Db } from "mongodb";
import {
  Any,
  Catch,
  ConstructorType,
  EventType,
  Late,
  Of,
  TransportEvent,
} from "silentium";
import { Detached, RecordOf, Router, ToJson } from "silentium-components";
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
          const error = Late();
          return ToJson(
            RecordOf({
              data: Any(
                Catch(List(dbTransport(), collectionName), error),
                Of(null),
              ),
              error: Any(error, Of(null)),
            }),
          );
        }),
      },
      {
        pattern: `^GET:${baseUrl}/.+/$`,
        event: TransportEvent(() => {
          const $url = UrlFromMessage(detachedReq);
          const error = Late();
          return ToJson(
            RecordOf({
              data: Any(
                Catch(Entity(dbTransport(), $url, collectionName), error),
                Of(null),
              ),
              error: Any(error, Of(null)),
            }),
          );
        }),
      },
      {
        pattern: `^POST:${baseUrl}$`,
        event: TransportEvent(() => {
          const error = Late();
          return ToJson(
            RecordOf({
              data: Any(
                Catch(
                  Created(dbTransport(), detachedReq, collectionName),
                  error,
                ),
                Of(null),
              ),
              error: Any(error, Of(null)),
            }),
          );
        }),
      },
      {
        pattern: `^PUT:${baseUrl}/.+/$`,
        event: TransportEvent(() => {
          const error = Late();
          return ToJson(
            RecordOf({
              data: Any(
                Catch(
                  Updated(dbTransport(), detachedReq, collectionName),
                  error,
                ),
                Of(null),
              ),
              error: Any(error, Of(null)),
            }),
          );
        }),
      },
      {
        pattern: `^DELETE:${baseUrl}/.+/$`,
        event: TransportEvent(() => {
          const error = Late();
          const $url = UrlFromMessage(detachedReq);
          return ToJson(
            RecordOf({
              data: Any(
                Catch(Removed(dbTransport(), $url, collectionName), error),
                Of(null),
              ),
              error: Any(error, Of(null)),
            }),
          );
        }),
      },
    ]),
    NotFoundSrc,
  );
};
