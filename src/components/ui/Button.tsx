import React, { ReactNode, useMemo } from 'react';
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacityProps,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';

import { isTrue } from '../../base/utils/baseUtil';
import { Colors } from '../../styles/Colors';
import { Ag, Text } from './Text';

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  Flat = 'flat',
}

export enum ButtonSize {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

interface IButtonProps extends TouchableOpacityProps {
  title?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  type?: ButtonType;
  containerStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
  size?: ButtonSize;
  textColor?: string;
  uppercase?: boolean;
  disabled?: boolean;
}

export const Button = ({ size = ButtonSize.Medium, type = ButtonType.Primary, ...props }: IButtonProps) => {
  const color = useMemo(() => {
    switch (type) {
      case ButtonType.Secondary:
        return props.textColor || Colors.disabled;

      case ButtonType.Flat:
        return props.textColor || Colors.primary;

      default:
        return props.textColor || Colors.white;
    }
  }, [type, props.textColor]);

  const buttonStyles = useMemo(() => {
    return [styles.default, styles[type], styles[size], props.style];
  }, [props.style, type, size]);

  const renderText = () => {
    if (!props.loading) {
      if (props.title) {
        return (
          <Text
            ag={Ag.Button}
            color={color}
            style={[
              styles.titleText,
              isTrue(props.startIcon) && styles.textStartIcon,
              isTrue(props.endIcon) && styles.textEndIcon,
            ]}
          >
            {props.uppercase ? props.title.toUpperCase() : props.title}
          </Text>
        );
      }

      return null;
    }

    return <ActivityIndicator color={color} />;
  };

  return (
    <TouchableOpacity
      onPress={props.loading || props.disabled ? undefined : props.onPress}
      activeOpacity={props.disabled ? 1 : props.activeOpacity}
      style={props.wrapperStyle}
      testID={props.testID}
    >
      <View style={[buttonStyles, styles.buttonOpacity, props.disabled && styles.buttonDisabledOpacity]}>
        {!props.loading && props.startIcon}
        {renderText()}
        {!props.loading && props.endIcon}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  default: {
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleText: {
    marginLeft: 0,
    marginRight: 0,
  },
  textStartIcon: {
    marginLeft: 14,
  },
  textEndIcon: {
    marginRight: 14,
  },
  buttonOpacity: {
    opacity: 1,
  },
  buttonDisabledOpacity: {
    opacity: 0.5,
  },

  [ButtonType.Primary]: {
    backgroundColor: Colors.primary,
  },
  [`${ButtonType.Primary}_Text`]: {
    color: Colors.white,
  },

  [ButtonType.Secondary]: {
    backgroundColor: Colors.grey1,
  },
  [`${ButtonType.Secondary}_Text`]: {
    color: Colors.black,
  },

  [ButtonType.Flat]: {
    backgroundColor: Colors.transparent,
  },
  [`${ButtonType.Flat}_Text`]: {
    color: Colors.primary,
  },

  large: {
    height: 48,
  },
  medium: {
    height: 40,
  },
  small: {
    height: 32,
  },
});
