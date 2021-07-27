describe('Quiz page', function () {
  before(() => {
    cy.log(`Visiting quiz page`)
    cy.visit('/quiz')
  })
  it('takes a quiz', function () {
    cy.contains('Quiz', { timeout: 10000 })

    cy.get('[data-cy=quizTitle]').contains('Sample Quiz').click()
    cy.get('[data-cy=startQuizButton]').click()

    cy.get('[data-cy=seeQuizQuestions]', { timeout: 20000 }).click()

    cy.contains('Answer').click()
    cy.contains('Submit').click()
    cy.contains('Try again?')
    cy.contains('Retry')
    cy.contains('Review')
  })

  it('reviews attempted quiz', function () {
    cy.contains('Review').click()
    cy.contains('Ask on the forum')
    cy.contains('Done').click()
    cy.contains('Retry')
    cy.contains('Review')
  })

  it('retries a quiz', function () {
    cy.contains('Retry').click()
    cy.contains('Wrong').click()
    cy.contains('Submit').click()
    cy.contains('Retry')
    cy.contains('Review')
  })
})
