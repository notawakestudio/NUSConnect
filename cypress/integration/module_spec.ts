describe('Module page', function () {
  before(() => {
    cy.log(`Visiting inbox page`)
    cy.visit('/module')
  })
  it('verifies UI', function () {
    cy.contains('Existing Modules')
  })
})
