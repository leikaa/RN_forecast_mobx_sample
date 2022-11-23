import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '../../styles/Colors';
import { IIconProps } from './types/Icon';

export const SearchIcon = ({ size, color }: IIconProps) => {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M10.3833 16.7666C11.7612 16.7666 13.0479 16.3184 14.0938 15.5713L18.0283 19.5059C18.2109 19.6885 18.4517 19.7798 18.7007 19.7798C19.2402 19.7798 19.6304 19.3647 19.6304 18.8335C19.6304 18.5845 19.5474 18.3521 19.3647 18.1694L15.4551 14.2515C16.2769 13.1724 16.7666 11.8359 16.7666 10.3833C16.7666 6.87207 13.8945 4 10.3833 4C6.86377 4 4 6.87207 4 10.3833C4 13.8945 6.86377 16.7666 10.3833 16.7666ZM10.3833 15.3887C7.63574 15.3887 5.37793 13.1226 5.37793 10.3833C5.37793 7.64404 7.63574 5.37793 10.3833 5.37793C13.1226 5.37793 15.3887 7.64404 15.3887 10.3833C15.3887 13.1226 13.1226 15.3887 10.3833 15.3887Z"
        fill={color || Colors.primary}
        fillOpacity="0.94"
      />
    </Svg>
  );
};
