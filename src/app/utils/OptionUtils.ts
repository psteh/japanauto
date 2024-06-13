export const convertArrayToOptions = (
  array: string[] | number[] = [],
): { label: string | number; value: string | number }[] => {
  return array.map((data) => {
    return { label: data, value: data };
  });
};

export const convertArrayToSliderMark = (
  array: number[] = [],
): { [key: number]: string | number } => {
  let marks: { [key: number]: string | number } = {};
  array.forEach((data) => {
    marks[data] = data;
  });

  return marks;
};
