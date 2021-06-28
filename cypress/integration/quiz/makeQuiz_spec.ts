describe('Make Quiz page', function () {
  before(() => {
    cy.log(`Visiting makeQuiz page`)
    cy.login()
    cy.visit('/quiz/make-quiz')
  })
  it('verifies UI', function () {
    cy.contains('Make a quiz')
  })
  it('fills form', function () {
    cy.get('input[name=title]').type('Sample quiz title')
    cy.get('input[name=week]').type('1')
    cy.get('input[name="tags.0"]').type('sample tag 1')
    cy.contains('Add More').click()
    cy.get('input[name="tags.1"]').type('sample tag 2')
    cy.contains('Select...').click()
  })
})
