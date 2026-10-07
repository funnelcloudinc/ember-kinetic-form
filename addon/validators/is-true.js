const defaultMessage = (name) => `${name} must be selected`;

export default function validateIsTrue(name, message = defaultMessage) {
  return (key, newValue) => {
    return newValue === true || message(name || key);
  };
}
