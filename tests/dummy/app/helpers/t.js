import { helper as buildHelper } from '@ember/component/helper';

export function t(params /*, hash*/) {
  return `${params[0]}`;
}

export default buildHelper(t);
