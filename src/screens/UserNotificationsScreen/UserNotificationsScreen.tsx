import {Linking} from 'react-native';
import React from 'react';
import {Button} from '@rneui/themed';
import {Container} from './UserNotificationsScreen.styles';

const UserNotificationsScreen = () => {
  const openSettings = () => {
    Linking.sendIntent('android.settings.APP_NOTIFICATION_SETTINGS', [
      {
        key: 'android.provider.extra.APP_PACKAGE',
        value: 'com.apply_digital_test',
      },
    ]);
  };

  return (
    <Container>
      <Button onPress={openSettings}>
        Modify your notification permissions
      </Button>
    </Container>
  );
};

export default UserNotificationsScreen;
