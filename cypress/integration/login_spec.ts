describe('Login page', function () {
  before(() => {
    cy.log(`Visiting login page`)
    cy.visit('/login')
  })
  it('verifies UI', function () {
    cy.contains('Login To Your Account')
  })
})
