import {Linking} from 'react-native';
import React from 'react';

import {Button} from 'react-native';

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
    <Button
      title="Modify your notification permissions"
      onPress={openSettings}
    />
  );
};

export default UserNotificationsScreen;
