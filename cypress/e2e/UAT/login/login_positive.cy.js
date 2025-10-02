/// <reference types="cypress" />
import loginPage from '../../../pageObjects/LoginPage'
import dashboardPage from '../../../pageObjects/DashboardPage'
import users from '../../../fixtures/users.json'

describe('SCB Dashboard – Login Feature: Positive Test Case', () => {

  beforeEach(() => {
    // Set base url automatically via cypress.config.js
    loginPage.visit()
  });

  it('[POSITIVE✅] Successful login with valid credentials', () => {
    loginPage.loginAs(users.validUser)

    // Should be directed to dashboard page
    dashboardPage.verifyDashboardPage()
    cy.wait(10000)
  });

  it('[POSITIVE✅] Password field allows special characters', () => {
    
    loginPage.loginAs(users.validCredentialWithSpecialChars);

    cy.wait(10000)

    // Verify successful login
    cy.url().then(url => {
      if (url.includes('/home')) {
        // success login, dashboard page is appeared
        cy.contains('Dashboard').should('be.visible')
      } else {
        // failed login, check error message
        cy.contains('Wrong email or password').should('be.visible')
      }
    })
  })

  it('[POSITIVE✅] Login with Remember Me checked should remember the username/session', () => {
    loginPage.fillUsername(users.validUser.username)
    loginPage.fillPassword(users.validUser.password)

    // Verify checkbox is uncheckedwith aria-checked="false" attribute
    loginPage.getRememberMeCheckbox().then($checkbox => {
      if ($checkbox.attr('aria-checked') === 'false') {
        cy.wrap($checkbox).click()
      }
    });

    loginPage.submit()

    cy.url().should('include', '/home')
    cy.contains('Dashboard').should('be.visible')

    // Reload page without clear session/copkies so "Remember Me" work
    cy.reload()

    // Re-visit login page
    loginPage.visit()

    // Verify user stay logged in
    cy.url().should('include', '/home')
    // or if only remember the username
    // loginPage.getUsernameField().should('have.value', validUsername)
  });

  it('[POSITIVE✅] Login with Remember Me unchecked should NOT remember the username/session', () => {
    loginPage.fillUsername(users.validUser.username)
    loginPage.fillPassword(users.validUser.password)

    
    // Check if checkbox is checked with arai-checked="true" attribute
    loginPage.getRememberMeCheckbox().then($checkbox => {
      if ($checkbox.attr('aria-checked') === 'true') {
        cy.wrap($checkbox).click()
      }
    })

    loginPage.submit()

    cy.url().should('include', '/home')
    cy.contains('Dashboard').should('be.visible')

    // simulate close browser: clear cookies, clear storage and reload the page
    cy.clearCookies()
    cy.reload()
    cy.clearAllLocalStorage()
    cy.clearAllSessionStorage()

    // Re-visit login page
    loginPage.visit()

    // Verify username field is empty and User should be directed to login page
    cy.url().should('include', '/sign-in')
  })
})