import {relativeTimeFromElapsed} from './utils';
import {compareArrays} from './utils';

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

describe('compareArrays', () => {
  it('should return true for arrays with the same elements in the same order', () => {
    const array1 = [1, 2, 3];
    const array2 = [1, 2, 3];
    expect(compareArrays(array1, array2)).toBe(true);
  });

  it('should return false for arrays with different lengths', () => {
    const array1 = [1, 2, 3];
    const array2 = [1, 2];
    expect(compareArrays(array1, array2)).toBe(false);
  });

  it('should return false for arrays with the same length but different elements', () => {
    const array1 = [1, 2, 3];
    const array2 = [1, 2, 4];
    expect(compareArrays(array1, array2)).toBe(false);
  });

  it('should return true for two empty arrays', () => {
    const array1: any[] = [];
    const array2: any[] = [];
    expect(compareArrays(array1, array2)).toBe(true);
  });

  it('should return false for arrays with same elements but different order', () => {
    const array1 = [1, 2, 3];
    const array2 = [3, 2, 1];
    expect(compareArrays(array1, array2)).toBe(false);
  });
});
