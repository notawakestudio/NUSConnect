describe('Dashboard page', function () {
  before(() => {
    cy.log(`Visiting dashboard page`)
    cy.visit('/dashboard')
  })
  it('verifies UI', function () {
    cy.contains('Good day!')
  })
})
