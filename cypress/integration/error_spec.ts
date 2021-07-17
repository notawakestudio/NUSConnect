describe('Error page', function () {
  before(() => {
    cy.log(`Visiting error page`)
    cy.visit('/thispagedoesnotexist', { failOnStatusCode: false })
  })
  it('verifies display of 404 page for invalid URL', function () {
    cy.contains("The stuff you were looking for doesn't exist!")
    cy.contains('Go Back')
  })

  it('redirects to landing page when button clicked', function () {
    cy.contains('Go Back').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })
})
