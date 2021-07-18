describe('ScoreBoard page', function () {
  before(() => {
    cy.log(`Visiting scorebord page`)
    cy.visit('/profile/scoreboard')
  })
  it('verifies UI', function () {
    cy.contains('ScoreBoard')
  })
})
