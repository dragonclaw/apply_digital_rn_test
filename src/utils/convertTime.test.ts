import {relativeTimeFromElapsed} from './convertTime'; // Adjust the import path as necessary

// Mock the current time to ensure consistent test results
Date.now = jest.fn(() => new Date('2023-01-01T01:00:00.00Z')) as any;

describe('relativeTimeFromElapsed', () => {
  it('should return "a few seconds ago" for a timestamp a few seconds ago', () => {
    const isoTimestamp = '2023-01-01T00:59:55Z';
    const result = relativeTimeFromElapsed(isoTimestamp);
    expect(result).toBe('a few seconds ago');
  });

  it('should return "a minute ago" for a timestamp a minute ago', () => {
    const isoTimestamp = '2023-01-01T00:59:00Z';
    const result = relativeTimeFromElapsed(isoTimestamp);
    expect(result).toBe('a minute ago');
  });

  it('should return "an hour ago" for a timestamp an hour ago', () => {
    const isoTimestamp = '2023-01-01T00:01:00Z';
    const result = relativeTimeFromElapsed(isoTimestamp);
    expect(result).toBe('an hour ago');
  });

  it('should return "a day ago" for a timestamp a day ago', () => {
    const isoTimestamp = '2022-12-31T00:01:00Z';
    const result = relativeTimeFromElapsed(isoTimestamp);
    expect(result).toBe('a day ago');
  });

  it('should return "a month ago" for a timestamp a month ago', () => {
    const isoTimestamp = '2022-12-01T00:00:00Z';
    const result = relativeTimeFromElapsed(isoTimestamp);
    expect(result).toBe('a month ago');
  });

  it('should return "a year ago" for a timestamp a year ago', () => {
    const isoTimestamp = '2022-01-01T00:00:00Z';
    const result = relativeTimeFromElapsed(isoTimestamp);
    expect(result).toBe('a year ago');
  });
});
