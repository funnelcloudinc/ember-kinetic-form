import validateIsTrue from './validators/is-true';
import { validatePresence } from 'ember-changeset-validations/validators';

// Messages name the field by its title. The key is the block id, which
// means nothing to the person filling the form in.
const nameOf = (property) => property.title || property.key;

export const DEFAULT_MESSAGES = {
  mustBeSelected: (name) => `${name} must be selected`,
  cantBeBlank: (name) => `${name} can't be blank`,
};

const VALIDATION_STRATAGIES = [
  [
    (p) => p.required && p.type === 'boolean',
    (p, messages) => [validateIsTrue(nameOf(p), messages.mustBeSelected)],
  ],
  [
    (p) => p.required && p.type === 'radios',
    (p, messages) => [validateIsTrue(nameOf(p), messages.mustBeSelected)],
  ],
  [
    (p) => p.required,
    (p, messages) => [
      validatePresence({
        presence: true,
        description: nameOf(p),
        message: () => messages.cantBeBlank(nameOf(p)),
      }),
    ],
  ],
];

export default function validatorsFor(property, messages = DEFAULT_MESSAGES) {
  for (let [predicate, strategy] of VALIDATION_STRATAGIES) {
    if (predicate(property)) {
      return strategy(property, { ...DEFAULT_MESSAGES, ...messages });
    }
  }
}
