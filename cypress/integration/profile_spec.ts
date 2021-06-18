describe('Profile page', function () {
  before(() => {
    cy.log(`Visiting profile page`)
    cy.visit('/profile')
  })
  it('verifies UI', function () {
    cy.contains('Edit')
  })
})
