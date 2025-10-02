/// <reference types="cypress" />
import loginPage from '../../../pageObjects/LoginPage'
import dashboardPage from '../../../pageObjects/DashboardPage'
import users from '../../../fixtures/users.json'

describe('SCB Dashboard – Login Feature: Negative Test Case', () => {

  beforeEach(() => {
    // Set base url automatically via cypress.config.js
    loginPage.visit()
  })

  it('[NEGATIVE❌] Login attempt with empty fields', () => {

    loginPage.submit()

    // Check error message 
    cy.contains('Username is required').should('be.visible')
    cy.contains('Password is required').should('be.visible')
    cy.wait(3000)
  })

  it('[NEGATIVE❌] Login attempt with empty username', () => {
    // fill password field, but leave username field with blank
    loginPage.fillPassword('wasder123')
    loginPage.submit()

    // Check error message
    cy.contains('Username is required').should('be.visible')
    cy.wait(3000)
  })

  it('[NEGATIVE❌] Login attempt with empty password', () => {
    // fill username field, but leave password with blank
    loginPage.fillUsername('maultest')
    loginPage.submit()

    // Check error message
    cy.contains('Password is required').should('be.visible')
    cy.wait(3000)
  })

  it('[NEGATIVE❌] Login attempt with incorrect email or password', () => {
    // Case 1: Valid username, wrong password
    loginPage.loginAs(users.invalidPassword)
    cy.contains('Wrong email or password').should('be.visible')

    // Re-visit login page
    loginPage.visit()

    // Case 2: wrong username, wrong password
    loginPage.loginAs(users.invalidBoth)
    cy.contains('Wrong email or password').should('be.visible')
  })

  it('[NEGATIVE❌] Login attempt with SQL injection', () => {
    loginPage.fillUsername('" OR 1=1 --')
    loginPage.fillPassword('test123')
    loginPage.submit()

    // Verify error message still same 
    cy.contains('Wrong email or password').should('be.visible')
  })

  it('[NEGATIVE❌] Inputting maximum character length in username and password', () => {
    // Fill with long input 255 char
    const longString = 'a'.repeat(255)

    loginPage.fillUsername(longString)
    loginPage.fillPassword(longString)
    loginPage.submit()

    // Verify the application answer with true
    cy.url().then(url => {
      if (url.includes('/dashboard')) {
        // Success login, dashboard page is appeared
        cy.contains('Dashboard').should('be.visible')
      } else {
        // Failed login, check error message
        cy.contains('Wrong email or password').should('be.visible')
      }
    })
  })

 
})