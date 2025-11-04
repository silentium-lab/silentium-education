import { type EventType, Of, RPC } from "silentium";
import { RecordOf } from "silentium-components";

/**
 * Represents a set of CRUD operations
 * that are sent for execution to the transport
 * named $transport
 */
export function CRUD(
  $model: EventType<string>,
  $transport: EventType<string> = Of("request"),
) {
  return new CRUDImpl($model, $transport);
}

class CRUDImpl {
  public constructor(
    private $model: EventType<string>,
    private $transport: EventType<string>,
  ) {}

  /**
   * List of entities from external system
   */
  public list<R extends unknown[] = []>(
    $search?: EventType<Record<string, unknown>>,
  ) {
    return RPC<R>(
      RecordOf({
        transport: this.$transport,
        method: Of("get"),
        params: RecordOf({
          model: this.$model,
          query: $search ?? Of({}),
        }),
      }),
    );
  }

  /**
   * One entity from external system
   */
  public entity<R = unknown>($id: EventType<string>) {
    return RPC<R>(
      RecordOf({
        transport: this.$transport,
        method: Of("get"),
        params: RecordOf({
          model: this.$model,
          query: RecordOf({
            id: $id,
          }),
        }),
      }),
    );
  }

  /**
   * Custom query
   */
  public custom<R = unknown>($search?: EventType<Record<string, unknown>>) {
    return RPC<R>(
      RecordOf({
        transport: this.$transport,
        method: Of("get"),
        params: RecordOf({
          model: this.$model,
          query: $search ?? Of({}),
        }),
      }),
    );
  }

  /**
   * Creating a new entity
   */
  public created<R = unknown>(formSrc: EventType) {
    return RPC<R>(
      RecordOf({
        transport: this.$transport,
        method: Of("post"),
        params: RecordOf({
          model: this.$model,
          body: formSrc,
        }),
      }),
    );
  }

  /**
   * Updating an entity
   */
  public updated<R = unknown>(
    idSrc: EventType<string>,
    formSrc: EventType<string>,
  ) {
    return RPC<R>(
      RecordOf({
        transport: this.$transport,
        method: Of("put"),
        params: RecordOf({
          model: this.$model,
          body: formSrc,
          query: RecordOf({
            id: idSrc,
          }),
        }),
      }),
    );
  }

  /**
   * Deleting an entity
   */
  public deleted<R = unknown>(idSrc: EventType<string>) {
    return RPC<R>(
      RecordOf({
        transport: this.$transport,
        method: Of("delete"),
        params: RecordOf({
          model: this.$model,
          query: RecordOf({
            id: idSrc,
          }),
        }),
      }),
    );
  }
}
