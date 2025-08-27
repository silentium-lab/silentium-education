import { Destroyable, InformationType, OwnerType } from "silentium";

export class Route<T> implements InformationType<T> {
  private instances: Destroyable[] = [];

  constructor(private builder: () => InformationType<T>) {}

  value(o: OwnerType<T>): this {
    const instance = this.builder();
    this.instances.push(instance as unknown as Destroyable);
    instance.value(o);
    return this;
  }

  destroy() {
    this.instances.forEach((instance) => instance?.destroy?.());
    this.instances = [];
    return this;
  }
}
