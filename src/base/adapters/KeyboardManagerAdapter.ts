import { Platform } from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';

export const keyboard = KeyboardManager;

if (Platform.OS === 'ios') {
  keyboard.setEnable(true);
  keyboard.setEnableDebugging(false);
  keyboard.setKeyboardDistanceFromTextField(10);
  keyboard.setEnableAutoToolbar(true);
  keyboard.setToolbarDoneBarButtonItemText('OK');
  keyboard.setToolbarManageBehaviourBy('subviews'); // "subviews" | "tag" | "position"
  keyboard.setToolbarPreviousNextButtonEnable(false);
  keyboard.setToolbarTintColor('#0000FF'); // Only #000000 format is supported
  keyboard.setToolbarBarTintColor('#FFFFFF'); // Only #000000 format is supported
  keyboard.setShouldShowToolbarPlaceholder(true);
  keyboard.setOverrideKeyboardAppearance(false);
  keyboard.setKeyboardAppearance('default'); // "default" | "light" | "dark"
  keyboard.setShouldResignOnTouchOutside(true);
  keyboard.setShouldPlayInputClicks(true);
  keyboard.resignFirstResponder();
}
