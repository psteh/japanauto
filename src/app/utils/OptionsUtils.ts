import _ from 'lodash';

const getLabel = (item: any, labelKey: any) => {
  if (Array.isArray(labelKey)) {
    return _.compact(labelKey.map((key) => item[key])).join(' | ');
  } else {
    return item[labelKey];
  }
};

export function convertSelectorFormat(
  arr: Array<{ [key: string]: string }>,
  labelKey: string = '',
  valueKey: string = '',
  sortAlphabeticalOrder: boolean = false,
) {
  if (!arr || !arr.length) {
    return [];
  }

  const result = arr.map((item) => ({
    label: labelKey ? getLabel(item, labelKey) : item,
    value: valueKey ? item[valueKey] : item,
    _data: item,
  }));

  if (sortAlphabeticalOrder) {
    return result.sort((a, b) => a.label.localeCompare(b.label));
  } else {
    return result;
  }
}
