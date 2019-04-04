import { Alert } from 'react-native';

export default function AlertAsync(title, body, buttons, options) {
  return new Promise((resolve, reject) => {
    const buttonWithCustomCallbacks = buttons.map(b => {
      return { text: b.text, onPress: () => {
        resolve(b.text);
        b.onPress();
      }};
    });
    Alert.alert(title, body, buttonWithCustomCallbacks, options);
  });
}
