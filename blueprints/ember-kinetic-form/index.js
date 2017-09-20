/* eslint-env node */
module.exports = {
  description: '',

  normalizeEntityName: function () {},

  afterInstall() {
    return this.addPackagesToProject({
      'ember-changeset': '^1.3.0',
      'ember-changeset-validations': '^1.2.8'
    });
  }
};
