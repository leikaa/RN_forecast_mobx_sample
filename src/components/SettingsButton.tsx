import React from 'react';
import { TouchableOpacity } from 'react-native';

import Navigation from '../base/Navigation';
import { Screens } from '../navigation/consts/screens';
import { Stacks } from '../navigation/consts/stacks';
import { SettingsIcon } from './icons/SettingsIcon';

export const SettingsButton = () => {
  const handleNavigateToProfile = () => {
    Navigation.navigate(Stacks.SETTINGS_STACK, { screen: Screens.SETTINGS_MAIN });
  };

  return (
    <TouchableOpacity onPress={handleNavigateToProfile}>
      <SettingsIcon />
    </TouchableOpacity>
  );
};
