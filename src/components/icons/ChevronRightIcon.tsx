import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '../../styles/Colors';
import { IIconProps } from './types/Icon';

export const ChevronRightIcon = ({ size, color }: IIconProps) => {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14.0604 12.1106L9.11035 7.16061L10.5244 5.74661L16.8884 12.1106L10.5244 18.4746L9.11035 17.0606L14.0604 12.1106Z"
        fill={color || Colors.grey2}
      />
    </Svg>
  );
};
