import { Text, TextInput } from 'react-native';

/**
 *  Disabling the ability to increase the size of the text (from the device settings)
 *
 *  This method may not help you with Alert, PickerIOS, DatePickerIOS, TabBarIOS.
 */

interface IDefaultTextProps extends Text {
  defaultProps?: { allowFontScaling?: boolean };
}

interface IDefaultInputProps extends TextInput {
  defaultProps?: { allowFontScaling?: boolean };
}

(Text as unknown as IDefaultTextProps).defaultProps = (Text as unknown as IDefaultTextProps).defaultProps || {};
(Text as unknown as IDefaultTextProps).defaultProps!.allowFontScaling = false;

(TextInput as unknown as IDefaultInputProps).defaultProps =
  (TextInput as unknown as IDefaultInputProps).defaultProps || {};
(TextInput as unknown as IDefaultInputProps).defaultProps!.allowFontScaling = false;
