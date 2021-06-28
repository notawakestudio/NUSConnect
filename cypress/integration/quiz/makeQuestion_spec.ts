describe('Make Question page', function () {
  before(() => {
    cy.log(`Visiting makeQuiz page`)
    cy.visit('/quiz')
  })
  it('verifies UI without login', function () {
    cy.contains('Contribute A Quiz').click()
    cy.url().should('eq', 'http://localhost:3000/quiz/make-question')
  })
  it('verifies UI with login', function () {
    cy.login()
    cy.reload()
    cy.contains('Make a question')
  })
  it('fills form', function () {
    cy.contains('Select...').click()
    cy.get('textarea[name=question]').type('Sample question text')
    cy.get('textarea[name="answers.0.main"]').type('Sample question answer 1')
    cy.contains('Add More').click()
    cy.get('textarea[name="answers.1.main"]').type('Sample question answer 2')
  })
})
