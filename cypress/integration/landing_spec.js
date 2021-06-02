describe('Landing page', function () {
  before(() => {
    cy.log(`Visiting Landing page`)
    cy.visit('/')
  })
  it('opens landing page', function () {
    cy.contains('Quiz')
    cy.contains('Forum')
    cy.contains('Guide')
  })
})