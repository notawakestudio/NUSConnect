describe('Badges page', function () {
  before(() => {
    cy.log(`Visiting badges page`)
    cy.visit('/profile/badges')
  })
  it('verifies display of badges page', function () {
    cy.contains('Your badges')
    cy.contains('Available badges')
  })

  it('contains two welcome badges', function () {
    cy.get('[data-cy=Welcome]').should('have.length', 2)
  })
})
