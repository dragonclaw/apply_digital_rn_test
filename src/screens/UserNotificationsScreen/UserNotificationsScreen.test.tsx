import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import UserNotificationsScreen from './UserNotificationsScreen';
import {createTheme, ThemeProvider} from '@rneui/themed';
import {Linking} from 'react-native';

describe('UserNotificationsScreen', () => {
  it('renders correctly and matches snapshot', async () => {
    const theme = createTheme();
    const {toJSON, getByText} = render(
      <ThemeProvider theme={theme}>
        <UserNotificationsScreen />
      </ThemeProvider>,
    );
    expect(toJSON()).toMatchSnapshot();
    expect(getByText('Modify your notification permissions')).toBeTruthy();
    fireEvent.press(getByText('Modify your notification permissions'));
    await waitFor(() =>
      expect(Linking.sendIntent).toHaveBeenCalledWith(
        'android.settings.APP_NOTIFICATION_SETTINGS',
        [
          {
            key: 'android.provider.extra.APP_PACKAGE',
            value: 'com.apply_digital_test',
          },
        ],
      ),
    );
  });
});
