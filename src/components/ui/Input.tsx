import React, { forwardRef, Ref, useEffect, useMemo, useRef, useState } from 'react';
import {
  ColorValue,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import Animated, { EasingNode, interpolateNode, timing } from 'react-native-reanimated';

import { Colors } from '../../styles/Colors';
import { CloseCircleIcon } from '../icons/CloseCircleIcon';
import { Ag, Text } from './Text';

export enum InputSize {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

export interface IInputProps extends TextInputProps {
  onChangeText?: (value: string) => void;
  isRequired?: boolean;
  isValid?: boolean;
  label?: string;
  errorMessage?: string;
  size?: InputSize;
  containerStyle?: StyleProp<ViewStyle>;
  backgroundColor?: ColorValue;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
}

export const Input = forwardRef((props: IInputProps, inputRef: Ref<TextInput>) => {
  const { size = InputSize.Large } = props;
  const hasValue = Boolean(props.value?.length);

  const [isFocused, setIsFocused] = useState<boolean>(Boolean(props.autoFocus));
  const [isCaretHidden, setIsCaretHidden] = useState<boolean>(true);
  const [shouldValidate, setShouldValidate] = useState<boolean>(false);

  const animationDuration = 120;
  const shouldAnimate = isFocused || hasValue;
  const labelAnimation = useRef(new Animated.Value(props.autoFocus || hasValue ? 1 : 0)).current;

  const isError = props.isValid === false && Boolean(props.errorMessage?.trim().length) && hasValue && shouldValidate;

  const placeholder = useMemo(() => {
    if (props.placeholder) {
      if (props.isRequired) {
        return `${props.placeholder}*`;
      }

      return props.placeholder;
    }

    return undefined;
  }, [props.isRequired, props.placeholder]);

  useEffect(() => {
    setTimeout(() => {
      timing(labelAnimation, {
        toValue: shouldAnimate ? 1 : 0,
        duration: animationDuration,
        easing: EasingNode.sin,
      }).start();

      setTimeout(() => {
        setIsCaretHidden(!shouldAnimate);
      }, Math.floor(animationDuration / 2));
    }, 0);
  }, [isFocused, hasValue]);

  const handleOnChangeText = (value: string) => {
    if (props.onChangeText) {
      setShouldValidate(false);

      props.onChangeText(value);
    }
  };

  const handleOnFocus = () => {
    setIsFocused(true);
  };

  const handleOnBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    props.onBlur && props.onBlur(e);

    setIsFocused(false);

    if (hasValue && !shouldValidate) {
      setShouldValidate(true);
    }
  };

  const renderError = (title: string) => {
    return (
      <View style={styles.errorWrap}>
        <View style={styles.errorIcon}>
          <CloseCircleIcon color={Colors.red} />
        </View>
        <Text ag={Ag.Caption} color={Colors.red}>
          {title}
        </Text>
      </View>
    );
  };

  const renderErrorMessage = () => {
    if (isError && props.errorMessage) {
      return renderError(props.errorMessage);
    }

    return null;
  };

  return (
    <>
      <View
        style={[
          styles.container,
          props.containerStyle,
          isFocused && styles.focused,
          size && styles[size],
          props.multiline && styles.multiline,
          isError ? styles.containerError : {},
        ]}
      >
        {props.leftComponent ? null : (
          <View
            pointerEvents={'none'}
            style={[StyleSheet.absoluteFill, styles.label, props.multiline ? styles.multilineLabel : {}]}
          >
            <Animated.View
              style={{
                transform: [
                  {
                    translateX: interpolateNode(labelAnimation, {
                      inputRange: [0, 1],
                      outputRange: [0, 0],
                    }),
                  },
                  {
                    translateY: interpolateNode(labelAnimation, {
                      inputRange: [0, 1],
                      outputRange: [0, -12],
                    }),
                  },
                ],
              }}
            >
              <Animated.View
                style={[
                  styles.labelBackLine,
                  {
                    opacity: interpolateNode(labelAnimation, {
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                  },
                ]}
              />
              <Animated.Text
                style={{
                  fontSize: interpolateNode(labelAnimation, {
                    inputRange: [0, 1],
                    outputRange: [16, 12],
                  }),
                  ...styles.labelText,
                }}
              >
                {placeholder}
              </Animated.Text>
            </Animated.View>
          </View>
        )}

        <View style={styles.content} pointerEvents={props.editable === false ? 'none' : 'auto'}>
          {props.leftComponent && <View style={styles.leftComponentWrap}>{props.leftComponent}</View>}

          <TextInput
            {...props}
            ref={inputRef}
            onChangeText={handleOnChangeText}
            style={[
              styles.input,
              props.multiline && styles.multilineInput,
              props.leftComponent ? styles.leftComponentText : {},
            ]}
            caretHidden={isCaretHidden}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            placeholder={props.leftComponent ? placeholder : ''}
            selectionColor={isCaretHidden ? Colors.transparent : Colors.primary}
          />

          {props.rightComponent && <View style={styles.rightComponentWrap}>{props.rightComponent}</View>}
        </View>
      </View>

      {renderErrorMessage()}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.disabled,
    height: 48,
    position: 'relative',
    backgroundColor: Colors.white,
  },
  containerError: {
    borderColor: Colors.red,
  },
  focused: {
    borderColor: Colors.primary,
  },
  multiline: {
    height: 180,
  },
  multilineInput: {
    textAlignVertical: 'top',
  },
  label: {
    zIndex: 1,
    position: 'absolute',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  labelText: {
    lineHeight: 18,
    color: Colors.grey2,
  },
  multilineLabel: {
    justifyContent: 'flex-start',
    top: 16,
  },
  labelBackLine: {
    position: 'absolute',
    top: 10,
    left: -5,
    right: -5,
    height: 2,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    overflow: 'hidden',
    borderRadius: 5,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    margin: 0,
    paddingTop: 21,
    paddingBottom: 7,
    color: Colors.black,
    fontSize: 16,
    lineHeight: 18,
  },
  errorWrap: {
    marginTop: 4,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  errorIcon: {
    width: 13,
    height: 13,
    marginRight: 3,
  },
  leftComponentText: {
    paddingLeft: 6,
    paddingTop: 8,
  },
  leftComponentWrap: {
    width: 22,
    height: 22,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  rightComponentWrap: {
    justifyContent: 'center',
    paddingRight: 8,
  },

  large: {
    height: 48,
  },
  medium: {
    height: 38,
  },
  small: {
    height: 32,
  },
});
