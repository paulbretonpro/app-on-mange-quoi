const snakeToCamel = (snakeCaseString: string) => {
  return snakeCaseString.replace(/(_\w)/g, (match) => match[1].toUpperCase());
};

export const transformObjectKeys = (obj: unknown): Array<unknown> => {
  if (Array.isArray(obj)) {
    return obj.map((item) => transformObjectKeys(item));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[snakeToCamel(key)] = transformObjectKeys(obj[key]);
      return acc;
    }, {});
  }
  return obj;
};
