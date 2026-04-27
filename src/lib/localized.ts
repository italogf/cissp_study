type LocalizedRecord = {
  locale: string;
};

export function pickLocaleRecord<T extends LocalizedRecord>(records: T[], locale: string) {
  const exactMatch = records.find((record) => record.locale === locale);

  if (exactMatch) {
    return exactMatch;
  }

  const englishFallback = records.find((record) => record.locale === "en");

  if (englishFallback) {
    return englishFallback;
  }

  const firstRecord = records[0];

  if (!firstRecord) {
    throw new Error(`Missing localized record for locale "${locale}".`);
  }

  return firstRecord;
}
