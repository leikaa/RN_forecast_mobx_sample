import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Navigation from '../base/Navigation';
import { Colors } from '../styles/Colors';
import { Stacks } from './consts/stacks';
import HomeStack from './stacks/HomeStack';
import InitStack from './stacks/InitStack';

const Stack = createStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.white,
  },
};

const Navigator = () => {
  return (
    <NavigationContainer ref={Navigation.navigationRef} theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Stacks.INIT_STACK} component={InitStack} />
        <Stack.Screen name={Stacks.HOME_STACK} component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
