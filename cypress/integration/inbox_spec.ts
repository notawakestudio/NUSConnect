describe('Inbox page', function () {
  before(() => {
    cy.log(`Visiting inbox page`)
    cy.visit('/profile/inbox')
  })
  it('verifies UI', function () {
    cy.contains('Thank you for coming onboard!')
    cy.contains('General')
  })
})
