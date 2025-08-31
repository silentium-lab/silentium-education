import { From, InformationType, Late, MaybeInformationType, MbInfo, OwnerType, SharedSource, TheInformation } from "silentium";
import { Sync } from "silentium-components";

/**
 * Data representation from Storage API
 */
export class StorageRecord<T> extends TheInformation<T> implements OwnerType<T> {
  private nameSrc: InformationType<string>;
  private resultSrc = new SharedSource(new Late<T>());
  private nameSync: Sync<string>;

  public constructor(
    name: MaybeInformationType<string>,
    private defaultValue?: unknown,
    private storageType = 'localStorage'
  ) {
    super();
    this.nameSrc = this.dep(new MbInfo(name));
    this.nameSync = new Sync(this.nameSrc);
  }

  public value(o: OwnerType<T>): this {
    const storage = window[this.storageType];
    this.nameSrc.value(new From((name) => {
      window.addEventListener("storage", (e) => {
        if (e.storageArea === storage) {
          if (e.key === name) {
            const newValue = e.newValue ? JSON.parse(e.newValue) : this.defaultValue;
            if (newValue !== undefined && newValue !== null) {
              this.give(newValue as T);
            }
          }
        }
      });
      if (storage[name]) {
        try {
          this.resultSrc.give(JSON.parse(storage[name]));
        } catch {
          console.warn(`LocalStorageRecord cant parse value ${name}`);
        }
      } else if (this.defaultValue !== undefined) {
        this.give(this.defaultValue as T);
      }
    }));
    this.resultSrc.value(o);
    return this;
  }

  public give(value: T): this {
    const storage = window[this.storageType];
    this.resultSrc.give(value);

    try {
      storage[this.nameSync.valueSync()] = JSON.stringify(value);
    } catch {
      console.warn(`LocalStorageRecord cant stringify value`);
    }
    return this;
  }
}
