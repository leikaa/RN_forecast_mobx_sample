export default class DataFormatterHelper {
  static ucFirst = (value: string) => {
    return value[0].toUpperCase() + value.substring(1);
  };
}
