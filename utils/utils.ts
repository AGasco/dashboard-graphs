export const enumToOptions = (enumObject: any) =>
  Object.values(enumObject).map((value) => ({
    label: value as string,
    value: value as string
  }));

export const formatDate = (date: Date | null) =>
  date ? new Date(date).toLocaleDateString() : '';

export const prefixCurrency = (value: number, currencySymbol: string) =>
  `${currencySymbol} ${value.toLocaleString()}`;
