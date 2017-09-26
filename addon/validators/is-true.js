export default function validateIsTrue() {
  return (key, newValue) => {
    return (newValue === true);
  };
}
