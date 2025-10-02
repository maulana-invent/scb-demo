class ForgotPasswordPage {
    visit() {
      cy.visit('/forgot-password'); // sesuaikan URL forgot password
    }
    getEmailInput() {
      return cy.get('#email');
    }
    getSendResetLinkButton() {
      return cy.contains('Send reset link');
    }
    getEmptyEmailError() {
      return cy.contains('Email address is required');
    }
    getInvalidEmailError() {
      return cy.contains('Please enter a valid email address');
    }
    getSuccessMessage() {
      return cy.contains("Password reset sent! You'll receive an email if you are registered on our system.");
    }
    getReturnToSignInLink() {
      return cy.contains('sign in');
    }
  }
  
  export default new ForgotPasswordPage();