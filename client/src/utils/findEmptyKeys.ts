export const findEmptyFields = (data: { [keys: string]: any }): string[] => {
  return Object.keys(data).reduce((acc: string[], key) => {
    if (data[key] === null || data[key] === "") {
      acc.push(key);
    } else if (Array.isArray(data[key]) && !data[key]?.length) {
      acc.push(key);
    }
    return acc;
  }, []);
};
