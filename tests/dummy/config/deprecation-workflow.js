/* 
  https://github.com/mixonic/ember-cli-deprecation-workflow
  The deprecations below are obtained by running `console.log(deprecationWorkflow.flushDeprecations())`
  in the browser console that i srunning the test suite, from `ember test --server`.
*/
self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchId: "ember-cli-page-object.old-collection-api" },
    { handler: "silence", matchId: "ember-views.curly-components.jquery-element" },
    { handler: "silence", matchId: "ember-test-helpers.rendering-context.jquery-element" },
    { handler: "silence", matchId: "computed-property.override" }
  ]
};