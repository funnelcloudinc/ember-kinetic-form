import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const definition = (required) => ({
  schema: {
    type: 'object',
    properties: {
      hoses: { type: 'boolean', title: 'Hoses inspected for wear' },
      reason: { type: 'string', title: 'Reason for visit' },
    },
    required,
  },
  form: ['hoses', 'reason'],
});

module(
  'Integration | Component | semantic-ui-kinetic-form | invalid submit',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function () {
      this.scrolledTo = [];
      this.originalScrollIntoView = Element.prototype.scrollIntoView;
      const scrolledTo = this.scrolledTo;
      Element.prototype.scrollIntoView = function () {
        scrolledTo.push(this);
      };
      this.set('model', {});
      this.set('submit', () => {});
    });

    hooks.afterEach(function () {
      Element.prototype.scrollIntoView = this.originalScrollIntoView;
    });

    test('the summary names the fields and uses the host title', async function (assert) {
      this.set('definition', definition(['hoses', 'reason']));

      await render(hbs`
      <SemanticUiKineticForm
        @definition={{this.definition}}
        @model={{this.model}}
        @onSubmit={{this.submit}}
        @errorsTitle="Please fix the following"
      />
    `);
      await click('button[type="submit"]');

      assert
        .dom('.semantic-ui-kinetic-form--errors .header')
        .hasText('Please fix the following');
      assert.dom('.semantic-ui-kinetic-form--errors li').exists({ count: 2 });
      assert
        .dom('.semantic-ui-kinetic-form--errors')
        .includesText('Hoses inspected for wear must be selected')
        .includesText("Reason for visit can't be blank");
    });

    test('several problems scroll to the summary', async function (assert) {
      this.set('definition', definition(['hoses', 'reason']));

      await render(hbs`
      <SemanticUiKineticForm
        @definition={{this.definition}}
        @model={{this.model}}
        @onSubmit={{this.submit}}
      />
    `);
      await click('button[type="submit"]');

      assert.strictEqual(this.scrolledTo.length, 1, 'scrolled once');
      assert.ok(
        this.scrolledTo[0].classList.contains(
          'semantic-ui-kinetic-form--errors'
        ),
        'to the error summary'
      );
    });

    test('a single problem scrolls to the field', async function (assert) {
      this.set('definition', definition(['reason']));

      await render(hbs`
      <SemanticUiKineticForm
        @definition={{this.definition}}
        @model={{this.model}}
        @onSubmit={{this.submit}}
      />
    `);
      await click('button[type="submit"]');

      assert.strictEqual(this.scrolledTo.length, 1, 'scrolled once');
      assert.ok(
        this.scrolledTo[0].classList.contains('has-error'),
        'to the invalid field'
      );
      assert.ok(
        this.scrolledTo[0].classList.contains(
          'semantic-ui-kinetic-form--string'
        ),
        'which is the reason field'
      );
    });

    test('a valid form does not scroll', async function (assert) {
      this.set('definition', definition([]));

      await render(hbs`
      <SemanticUiKineticForm
        @definition={{this.definition}}
        @model={{this.model}}
        @onSubmit={{this.submit}}
      />
    `);
      await click('button[type="submit"]');

      assert.strictEqual(this.scrolledTo.length, 0);
      assert.dom('.semantic-ui-kinetic-form--errors').doesNotExist();
    });
  }
);
