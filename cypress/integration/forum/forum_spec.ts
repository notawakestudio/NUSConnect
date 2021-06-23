describe('Forum page', function () {
  before(() => {
    cy.log(`Visiting forum page`)
    cy.visit('/forum')
  })
  it('verifies homepage UI', function () {
    cy.contains('All Posts', { timeout: 10000 })
    cy.contains('New Post', { timeout: 10000 })
  })

  it('verifies create post button', function () {
    cy.get('button[data-cy=newPost]').should('be.visible').click()
    cy.contains('Login To Your Account')
  })

  it('visits a post', function () {
    cy.get('[data-cy=postList]').should('be.visible').children().should('have.length.at.least', 1)

    cy.get('[data-cy=postList]').children().first().as('postItem')

    cy.get('@postItem').within(() => {
      cy.get('[data-cy=author]').as('author')
    })
    cy.get('@postItem').click()
    cy.get('@author')
      .invoke('text')
      .then((text) => {
        cy.get('[data-cy=postMain]', { timeout: 10000 }).within(() => {
          cy.get('[data-cy=author]').should('have.text', text)
        })
      })
  })

  it('visits by a logged in user', function () {
    cy.login()
    cy.visit('/forum/create-post')
    cy.get('[data-cy=newPostForm]').within(() => {
      cy.contains('Make a post')
    })

    cy.get('[data-cy=postList]').children().first().click()
    cy.get('[data-cy=newReplyForm]').within(() => {
      cy.contains('New comment')
    })
  })
})
