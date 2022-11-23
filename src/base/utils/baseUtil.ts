//it can be shortened to !!value, but right part here is more for visual effect
export const isTrue = (value: any) => {
  return !!value === true;
};

export const isEmpty = (value: any) => {
  return typeof value === 'undefined' || value === null;
};

export const isFirst = (index: number) => {
  return index === 0;
};

export const isLast = (data: any[], index: number) => {
  return data.length - 1 === index;
};
