import validateIsTrue from './validators/is-true';
import { validatePresence } from 'ember-changeset-validations/validators';

const VALIDATION_STRATAGIES = [
  [(p => p.required && p.type === 'boolean'), (() => [validateIsTrue()])],
  [(p => p.required && p.type === 'radios'), (() => [validateIsTrue()])],
  [(p => p.required), (() => [validatePresence(true)])]
];

export default function validatorsFor(property) {
  for (let [ predicate, strategy ] of VALIDATION_STRATAGIES) {
    if (predicate(property)) {
      return strategy(property);
    }
  }
}
