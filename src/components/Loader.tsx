import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

import { Colors } from '../styles/Colors';

export const Loader = (props: ActivityIndicatorProps) => {
  return <ActivityIndicator size={'large'} color={Colors.primary} {...props} />;
};
