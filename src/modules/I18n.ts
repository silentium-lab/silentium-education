import { All, Applied, Destroyable, type InformationType } from "silentium";

/**
 * Representation of static translation texts
 */
export class I18n extends Destroyable {
  public constructor(
    private langSrc: InformationType<string>,
    private translationsSrc: InformationType<
      Record<string, Record<string, string>>
    >,
  ) {
    super(langSrc, translationsSrc);
  }

  public tr(field: string) {
    return new Applied(
      new All(this.langSrc, this.translationsSrc),
      ([l, translations]) => {
        return translations?.[l]?.[field] ?? field;
      },
    );
  }
}
