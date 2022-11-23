import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '../../styles/Colors';
import { IIconProps } from './types/Icon';

export const BackIcon = ({ size, color }: IIconProps) => {
  return (
    <Svg width={size || '24'} height={size || '24'} viewBox="0 0 24 24">
      <Path
        d="M12.1768 4.17676C12.372 4.37202 12.372 4.6886 12.1768 4.88386L5.81066 11.25H20.5C20.7762 11.25 21 11.4739 21 11.75V12.25C21 12.5262 20.7762 12.75 20.5 12.75H5.81071L12.1768 19.1161C12.372 19.3114 12.372 19.628 12.1768 19.8232L11.8232 20.1768C11.628 20.372 11.3114 20.372 11.1161 20.1768L3.29293 12.3535C3.09767 12.1583 3.09767 11.8417 3.29293 11.6464L11.1161 3.82321C11.3114 3.62794 11.628 3.62794 11.8232 3.82321L12.1768 4.17676Z"
        fill={color || Colors.primary}
      />
    </Svg>
  );
};
