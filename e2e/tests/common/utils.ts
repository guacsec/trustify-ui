export const typedEntries = <T extends object>(obj: T) => {
  return Object.entries(obj) as [Extract<keyof T, string>, T[keyof T]][];
};
