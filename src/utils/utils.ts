export const compareArrays = (a: any[], b: any[]) =>
  a.length === b.length &&
  a.every((element: any, index: number) => element === b[index]);

import moment from 'moment';

/**
 * Get a human-readable relative time message from elapsed time.
 * @param isoTimestamp - the ISO timestamp to compare with the current time
 */
export const relativeTimeFromElapsed = (isoTimestamp: string) => {
  const now = moment();
  const timestamp = moment(isoTimestamp);
  return timestamp.from(now);
};
