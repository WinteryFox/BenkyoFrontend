import * as ReactDOM from 'react-dom';
window.ReactDOM = ReactDOM;

/*beforeEach(() => {
    cy.restoreLocalStorage()
})

afterEach(() => {
    cy.saveLocalStorage()
})*/

describe('Add deck redirects to login without current user', () => {
    it('Should redirect to /login', () => {
        cy.visit('http://localhost:3000/en')
        cy.get('button[id="new-deck"]').click()
        cy.url().should('include', '/login')
    })
})

describe('Test login flow', () => {
    it('Click login button', () => {
        cy.visit('http://localhost:3000/en')
        cy.get('a[id="login"]').click()
        cy.url().should('include', '/login')
    })

    it('Attempt submit with no data', () => {
        cy.get('button').click()
        cy.url().should('include', '/login') // No redirect because errors
    })

    it('Login on test account', () => {
        cy.get('input[id="email"]').click().type("test@example.com")
        cy.get('input[id="password"]').click().type("TestTest!1")
        cy.get('button[type="submit"]').click()
        cy.url().should('not.include', '/login')
    })
})

describe('Test deck creation/deletion flow E2E', () => {
    it('Create, add cards, delete cards, delete deck', () => {
        cy.visit('http://localhost:3000/en/login')
        cy.get('input[id="email"]').click().type("test@example.com")
        cy.get('input[id="password"]').click().type("TestTest!1")
        cy.get('button[type="submit"]').click()
        cy.url().should('not.include', '/login')

        cy.visit('http://localhost:3000/en')
        cy.get('button[id="new-deck"]').click()
        cy.url().should('include', '/decks/create')

        cy.get('input[id="name"]').click().type("Test deck")
        cy.get('input[id="shortDescription"]').click().type("This is a short description")
        cy.get('textarea[id="description"]').click().type("This is a longer description which also supports **Markdown**.")
        cy.get('input[id="sourceLanguage"]').click().type("en_US")
        cy.get('input[id="targetLanguage"]').click().type("ja_JP")
        cy.get('button[type="submit"]').click()
        cy.url().should('not.include', '/decks/create')

        cy.get('button[id="study"]').should('be.disabled')

        cy.get('button[id="create-card"]').click()
        cy.get('input[id="question"]').click().type("Test")
        cy.get('input[id="answer"]').click().type("テスト")
        cy.get('button[id="submit-card"]').click()

        cy.get('button[id="delete-card"]').click()

        cy.get('button[id="delete-deck"]').click()
    })
})

/*describe('Test header updating on login', () => {
    it('Login and check', () => {
        cy.visit('http://localhost:3000/en/login')
        cy.get('input[id="email"]').click().type("test@example.com")
        cy.get('input[id="password"]').click().type("TestTest!1")
        cy.get('button[type="submit"]').click()
        cy.get('a[id="profile"]').should('have.text', 'Test')
    })
})*/
