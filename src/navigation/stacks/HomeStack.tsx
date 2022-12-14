import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { HomeMainScreen } from '../../screens/home/HomeMainScreen';
import { Screens } from '../consts/screens';
import { HomeStackParamList } from '../types/HomeStackTypes';

const Stack = createStackNavigator<HomeStackParamList>();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.HOME_MAIN} component={HomeMainScreen} />
    </Stack.Navigator>
  );
};
