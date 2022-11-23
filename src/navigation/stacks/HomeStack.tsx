import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Header } from '../../components/Header';
import { Ag, Align } from '../../components/ui/Text';
import { HomeMainScreen } from '../../screens/home/HomeMainScreen';
import { Screens } from '../consts/screens';
import { HomeStackParamList } from '../types/HomeStackTypes';

const Stack = createStackNavigator<HomeStackParamList>();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screens.HOME_MAIN}
        component={HomeMainScreen}
        options={{
          header: () => <Header title={'Forecast'} titleAg={Ag.H1} titleAlign={Align.Left} />,
        }}
      />
    </Stack.Navigator>
  );
};
