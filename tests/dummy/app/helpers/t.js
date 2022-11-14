import Ember from 'ember';

export function t(params/*, hash*/) {
  return `${params[0]}`;
}

export default Ember.Helper.helper(t);
