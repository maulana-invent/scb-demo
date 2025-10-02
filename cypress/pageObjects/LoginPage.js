// cypress/pageObjects/LoginPage.js
class LoginPage {
    visit() {
      cy.visit('/sign-in');
    }
  
    fillUsername(username) {
      cy.get('#username').clear().type(username);
    }
  
    fillPassword(password) {
      cy.get('#password').clear().type(password);
    }
  
    submit() {
        cy.contains('button', 'Sign in').click();
    }

    getRememberMeCheckbox() {

      return cy.get('.mat-checkbox-inner-container').click();
    }
  
    getForgotPasswordLink() {
      return cy.contains('Forgot password?');
    }
  
    /** Convenience method – login using a user object from fixtures */
    loginAs(user) {
      this.fillUsername(user.username);
      this.fillPassword(user.password);
      this.submit();
    }
  }
  
  export default new LoginPage();