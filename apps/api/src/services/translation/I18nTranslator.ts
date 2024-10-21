import { ITranslator } from "./ITranslator";

type TranslationFunction = (key: string) => string;

export class I18nTranslator implements ITranslator {
  private t: TranslationFunction;

  constructor(t: TranslationFunction) {
    this.t = t;
  }

  translate(key: string): string {
    return this.t(key);
  }
}
