import {
  LateShared,
  MessageType,
  Primitive,
  type SourceType,
  Tap,
} from "silentium";

/**
 * Data representation from Storage API
 */
export function StorageRecord<T = string>(
  $name: MessageType<string>,
  defaultValue?: unknown,
  storageType: "localStorage" | "sessionStorage" = "localStorage",
): SourceType<T> {
  const nameSync = Primitive($name);
  const resultSrc = LateShared<T>();
  const result: SourceType<T> = {
    pipe(u) {
      resultSrc.pipe(u);
      const storage = window[storageType];
      $name.pipe(
        Tap((name) => {
          window.addEventListener("storage", (e) => {
            if (e.storageArea === storage) {
              if (e.key === name) {
                const newValue = e.newValue
                  ? JSON.parse(e.newValue)
                  : defaultValue;
                if (newValue !== undefined && newValue !== null) {
                  result.use(newValue as T);
                }
              }
            }
          });
          if (storage[name]) {
            try {
              resultSrc.use(JSON.parse(storage[name]));
            } catch {
              console.warn(`LocalStorageRecord cant parse value ${name}`);
            }
          } else if (defaultValue !== undefined) {
            result.use(defaultValue as T);
          }
        }),
      );
      return this;
    },
    use(v) {
      const storage = window[storageType];
      resultSrc.use(v);

      try {
        storage[nameSync.primitiveWithException()] = JSON.stringify(v);
      } catch {
        console.warn(`LocalStorageRecord cant stringify value`);
      }
    },
  };

  return result;
}
