// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
  cy.setCookie(
    '__Host-next-auth.csrf-token',
    'fb564e920eac2738f9c79659ce4ddae39d7ddaaba5f3a21f78dcbfc0e41712a4%7Cb263f1baa25f70da2c7a83870e4df55d85cb97c379d99e98ae9de1e8ea84312b',
    { secure: true }
  )
  cy.setCookie('__Secure-next-auth.callback-url', 'https%3A%2F%2Fnus-connect.vercel.app', {
    secure: true,
  })
  cy.setCookie(
    '__Secure-next-auth.session-token',
    'd4bf21493b52160dcfeb2b74083f7284019abc59801246035681e6f46c11a80b',
    { secure: true }
  )
  cy.intercept('http://localhost:3000/api/userData')
  cy.intercept('http://localhost:3000/api/auth/session', {
    user: {
      name: 'NotAwake Dreamer',
      email: 'notawakestudio@gmail.com',
      image:
        'https://lh3.googleusercontent.com/a-/AOh14GjVIwJj4n_QSMVdkJFje9SQDntv8BnRQCdXyesI=s96-c',
    },
    accessToken: 'e646b5cda0ecdeba0f70e422490e8cd1a1f24518d7d40ce4b98d6c476f1b5ae2',
    expires: '2021-12-22T14:12:54.188Z',
    userId: 'ddHg168Fwz9VIP1wxbzK',
  })
})
