import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { SettingsLanguageScreen } from '../../screens/settings/SettingsLanguageScreen';
import { SettingsMainScreen } from '../../screens/settings/SettingsMainScreen';
import { Screens } from '../consts/screens';
import { SettingsStackParamList } from '../types/SettingsStackTypes';

const Stack = createStackNavigator<SettingsStackParamList>();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.SETTINGS_MAIN} component={SettingsMainScreen} />
      <Stack.Screen name={Screens.SETTINGS_LANGUAGE} component={SettingsLanguageScreen} />
    </Stack.Navigator>
  );
};
