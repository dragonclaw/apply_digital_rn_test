export const compareArrays = (a: any[], b: any[]) =>
  a.length === b.length &&
  a.every((element: any, index: number) => element === b[index]);
