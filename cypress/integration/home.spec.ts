describe('Landing homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('has header', () => {
    cy.get('header').should('be.visible')
  })
})
