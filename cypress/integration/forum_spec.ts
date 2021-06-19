describe('Forum page', function () {
  before(() => {
    cy.log(`Visiting forum page`)
    cy.visit('/forum')
  })
  it('verifies UI', function () {
    cy.contains('All Posts')
  })
})
