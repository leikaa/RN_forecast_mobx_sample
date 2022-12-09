import React, { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';

import Navigation from '../../base/Navigation';
import { rootStore } from '../../base/RootStore';
import { Screens } from '../../navigation/consts/screens';
import { Stacks } from '../../navigation/consts/stacks';

export const InitScreen = () => {
  useEffect(() => {
    (async () => {
      await rootStore.sync();

      handleNavigate();
      BootSplash.hide();
    })();
  }, []);

  const handleNavigate = () => {
    Navigation.replace(Stacks.HOME_STACK, { screen: Screens.HOME_MAIN });
  };

  return <></>;
};
