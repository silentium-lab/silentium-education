import { MessageType, Of, RPC } from "silentium";
import { Concatenated, Record } from "silentium-components";

/**
 * Represents a set of CRUD operations
 * that are sent for execution to the transport
 * named $transport
 */
export function CRUD(
  $model: MessageType<string>,
  $transport: MessageType<string> = Of("request"),
) {
  return new CRUDImpl($model, $transport);
}

class CRUDImpl {
  public constructor(
    private $model: MessageType<string>,
    private $transport: MessageType<string>,
  ) {}

  /**
   * List of entities from external system
   */
  public list<R = unknown>($search?: MessageType<Record<string, unknown>>) {
    return RPC<R>(
      Record({
        transport: this.$transport,
        method: "get",
        params: Record({
          model: this.$model,
          query: $search ?? {},
        }),
      }),
    );
  }

  /**
   * One entity from external system
   */
  public entity<R = unknown>($id: MessageType<string>) {
    return RPC<R>(
      Record({
        transport: this.$transport,
        method: "get",
        params: Record({
          model: Concatenated([this.$model, Of("/"), $id, Of("/")]),
        }),
      }),
    );
  }

  /**
   * Custom query
   */
  public custom<R = unknown>($search?: MessageType<Record<string, unknown>>) {
    return RPC<R>(
      Record({
        transport: this.$transport,
        method: "get",
        params: Record({
          model: this.$model,
          query: $search ?? {},
        }),
      }),
    );
  }

  /**
   * Creating a new entity
   */
  public created<R = unknown>(
    $form: MessageType,
    $credentials?: MessageType<string>,
  ) {
    return RPC<R>(
      Record({
        transport: this.$transport,
        method: "post",
        params: Record({
          model: this.$model,
          body: $form,
          ...($credentials
            ? {
                credentials: $credentials,
              }
            : {}),
        }),
      }),
    );
  }

  /**
   * Updating an entity
   */
  public updated<R = unknown>($id: MessageType<string>, $form: MessageType) {
    return RPC<R>(
      Record({
        transport: this.$transport,
        method: "put",
        params: Record({
          model: Concatenated([this.$model, Of("/"), $id, Of("/")]),
          body: $form,
        }),
      }),
    );
  }

  /**
   * Deleting an entity
   */
  public deleted<R = unknown>($id: MessageType<string>) {
    return RPC<R>(
      Record({
        transport: this.$transport,
        method: "delete",
        params: Record({
          model: this.$model,
          query: Record({
            id: $id,
          }),
        }),
      }),
    );
  }
}
