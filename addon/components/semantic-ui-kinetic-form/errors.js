import KineticFormErrorsComponent from '../kinetic-form/errors';
import layout from '../../templates/components/semantic-ui-kinetic-form/errors';

export default KineticFormErrorsComponent.extend({
  layout,
  tagName: 'div',
  classNames: ['semantic-ui-kinetic-form--errors', 'ui', 'error', 'message'],
});
