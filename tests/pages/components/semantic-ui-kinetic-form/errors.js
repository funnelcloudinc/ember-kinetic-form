import PageObject from 'ember-cli-page-object';

const { collection } = PageObject;

export const SemanticUIKineticFormErrors = {
  scope: '.semantic-ui-kinetic-form--errors',
  messages: collection({
    scope: '.list',
    itemScope: 'li'
  })
};

export default PageObject.create(SemanticUIKineticFormErrors);
