import KineticFormSectionComponent from '../kinetic-form/section';
import layout from '../../templates/components/semantic-ui-kinetic-form/section';

export default KineticFormSectionComponent.extend({
  layout,
  tagName: 'h2',
  classNames: ['semantic-ui-kinetic-form--section', 'ui', 'dividing', 'header']
});
