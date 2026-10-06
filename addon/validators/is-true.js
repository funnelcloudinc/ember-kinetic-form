export default function validateIsTrue(name) {
  return (key, newValue) => {
    return newValue === true || `${name || key} must be selected`;
  };
}
