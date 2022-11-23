export default class FormValidationHelper {
  static isRequired = (field: string) => {
    return field.trim().length !== 0;
  };
}
