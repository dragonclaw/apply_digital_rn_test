import moment from 'moment';

/**
 * Get a human-readable relative time message from elapsed time.
 * @param isoTimestamp - the ISO timestamp to compare with the current time
 */
export function relativeTimeFromElapsed(isoTimestamp: string): string {
  const now = moment();
  const timestamp = moment(isoTimestamp);
  return timestamp.from(now);
}
