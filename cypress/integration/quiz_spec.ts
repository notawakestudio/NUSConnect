describe('Quiz page', function () {
  before(() => {
    cy.log(`Visiting quiz page`)
    cy.visit('/quiz')
  })
  it.skip('verifies UI', function () {
    cy.contains('All Quizzes')
  })
})
