import React from 'react';
import {render} from '@testing-library/react-native';
import ArticleListScreen from './ArticleListScreen'; // Adjust the import path as necessary
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock the articles service and notifee
jest.mock('../../services/articles/articles');
// jest.mock('@notifee/react-native');

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

// Mock notifee
jest.mock('@notifee/react-native', () => ({
  createChannel: jest.fn().mockResolvedValue('default'),
  onForegroundEvent: jest.fn(),
  onBackgroundEvent: jest.fn(),
  displayNotification: jest.fn(),
}));

jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn().mockResolvedValue({
    isConnected: true,
  }),
}));

jest.mock('react-native-background-fetch', () => ({
  configure: jest.fn(),
  scheduleTask: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('ArticleListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', async () => {
    // Mock AsyncStorage response
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify([{title: 'Test Article', author: 'Test Author'}]),
    );

    const {toJSON} = render(<ArticleListScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
