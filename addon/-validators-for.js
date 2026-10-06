import validateIsTrue from './validators/is-true';
import { validatePresence } from 'ember-changeset-validations/validators';

// Messages name the field by its title. The key is the block id, which
// means nothing to the person filling the form in.
const nameOf = (property) => property.title || property.key;

const VALIDATION_STRATAGIES = [
  [
    (p) => p.required && p.type === 'boolean',
    (p) => [validateIsTrue(nameOf(p))],
  ],
  [
    (p) => p.required && p.type === 'radios',
    (p) => [validateIsTrue(nameOf(p))],
  ],
  [
    (p) => p.required,
    (p) => [validatePresence({ presence: true, description: nameOf(p) })],
  ],
];

export default function validatorsFor(property) {
  for (let [predicate, strategy] of VALIDATION_STRATAGIES) {
    if (predicate(property)) {
      return strategy(property);
    }
  }
}
